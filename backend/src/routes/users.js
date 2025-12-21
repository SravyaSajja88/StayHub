import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { check,validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


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

        res.cookie('auth_token',token, {httpOnly:true,secure:process.env.NODE_ENV==='production',maxAge:24*60*60*1000});
        res.status(201).json({ message: "User registered successfully" });
        
    }
    catch(err){
        console.error("Error in /register:", err);
        res.status(500).json({message:"Something went wrong"});
    }
})

export default router;