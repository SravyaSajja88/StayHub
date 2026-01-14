import express from 'express';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {Hotel} from '../models/hotel.js';
import { verifyToken } from '../middlewares/auth.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits: {fileSize: 5 * 1024 * 1024}, //5MB limit
})

// api/my-hotels
router.post('/', verifyToken,upload.array("imageFiles", 6) ,[
    check('name').notEmpty().withMessage('Hotel name is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('type').notEmpty().withMessage('Type is required'),
    check('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
    check('facilities.*').notEmpty().withMessage('Facility is required')
    
],async(req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const imagefiles = req.files;
        const newHotel = req.body;
        //upload image to cloudinary
        const uploadPromises = imagefiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataUri = `data:${image.mimetype};base64,${b64}`;
            const res = await cloudinary.uploader.upload(dataUri);
            return res.url;

        })
        const imageUrls = await Promise.all(uploadPromises);

        //if successful, add url to new hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId; 

        
        //save new hotel in db
        const hotel = new Hotel(newHotel);
        await hotel.save();
        res.status(201).send(hotel);
        //return 201 status
    }
    catch(e) {
        console.log("error in creating hotel:",e);
        res.status(500).json({message:"Internal server error"});
    }
    
    
});
router.get('/',verifyToken, async(req,res) => {
    try{
        const hotels = await Hotel.find({userId:req.userId});
        res.status(200).json(hotels);
    }catch(error) {
        res.status(500).json({message:"Internal server error"});
    }
})
router.get('/:id',verifyToken, async(req,res) => {
    try{
        const hotel = await Hotel.findOne({_id:req.params.id, userId:req.userId});
        res.json(hotel);
    }
    catch(error) {
        res.status(500).json({message:"Internal server error"});
    }
});

router.put('/:id',verifyToken,upload.array("imageFiles",6),async(req,res) => {
    try{
        const hotel = await Hotel.findOne({
        _id: req.params.id,
        userId: req.userId,
        });

        if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
        }

        // assign fields manually
        hotel.name = req.body.name;
        hotel.city = req.body.city;
        hotel.country = req.body.country;
        hotel.description = req.body.description;
        hotel.type = req.body.type;
        hotel.pricePerNight = Number(req.body.pricePerNight);
        hotel.starRating = Number(req.body.starRating);
        hotel.adultCount = Number(req.body.adultCount);
        hotel.childCount = Number(req.body.childCount);
        hotel.facilities = req.body.facilities;
        hotel.lastUpdated = new Date();

        // upload new images
        const files = req.files || [];
        const newImageUrls = await uploadImages(files);

        // merge images
        hotel.imageUrls = [
        ...newImageUrls,
        ...(req.body.imageUrls || []),
        ];

        await hotel.save();
        res.status(200).json(hotel);
    }
    catch(error) {
        res.status(500).json({message:"Internal server error"});
    }
})
async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
export default router;