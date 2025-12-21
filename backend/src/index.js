import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'; 
import authRoutes from './routes/auth.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));//must configure this for getting cookies from frontend to backend

app.use(express.static(path.join(__dirname, '../dist')));


const PORT = 5000;

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  } else {
    next();
  }
});


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})