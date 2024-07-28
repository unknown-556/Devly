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
  params: async (req, file) => {
    let folder = 'apply';
    let resource_type = 'image';

    if (file.mimetype === 'application/pdf') {
      resource_type = 'raw'; 
    }

    return {
      folder: folder,
      resource_type: resource_type,
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    };
  },
});


const upload = multer({ storage: storage });


export default upload;

