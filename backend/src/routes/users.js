import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { check,validationResult } from 'express-validator';
import { verifyToken } from '../middlewares/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// /api/users/register
router.post('/register',
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        user = new User(req.body);
        await user.save();

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY, {expiresIn:'1d'});

        res.cookie('auth_token',token, {httpOnly:true,secure:false,maxAge:24*60*60*1000});
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(err){
        console.error("Error in /register:", err);
        res.status(500).json({message:"Something went wrong"});
    }
})

export default router;