import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyToken } from '../middlewares/auth.js';
import { check,validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/login',
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
    async (req,res)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({message:"Invalid credentials"});
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid credentials"});
            }
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY, {expiresIn:'1d'});
            res.cookie('auth_token',token, {httpOnly:true,secure:false,sameSite: "lax",path: '/',maxAge:24*60*60*1000});
            res.sendStatus(200);

        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"Something went wrong"});
        }
    }
)

router.post('/logout',(req,res)=>{
    res.clearCookie('auth_token',{
        httpOnly:true,
        secure:false,
        sameSite: 'lax'
    });
    res.sendStatus(200);
})

router.get('/validate-token',verifyToken,(req,res) => {
    res.status(200).json({userId: req.userId});
})
export default router;