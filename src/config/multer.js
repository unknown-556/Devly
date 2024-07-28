import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const allowedFormats = ['jpg', 'png', 'jpeg'];
    let resourceType = 'image';
    if (file.mimetype === 'application/pdf') {
      resourceType = 'raw';
    }
    return {
      folder: 'apply',
      allowed_formats: allowedFormats,
      resource_type: resourceType,
    };
  },
});


const upload = multer({ storage: storage });


export default upload;

