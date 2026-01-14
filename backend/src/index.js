import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'; 
import authRoutes from './routes/auth.js';
import myHotelsRoutes from './routes/my-hotels.js';
import hotelRoutes from "./routes/hotels.js";
import myBookingsRoutes from "./routes/my-bookings.js";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
    origin:"http://localhost:5173",
    credentials:true
}));//must configure this for getting cookies from frontend to backend


const PORT = 5000;

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/my-hotels',myHotelsRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", myBookingsRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})