import * as path from "path";

import {Router} from 'express';

import {v4 as uuidv4} from 'uuid';

const router = Router();

import {createLocationData} from '../controllers/app.controller.js';
import {getLocationData} from "../controllers/app.controller.js";
import multer from "multer";


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// fileFilter for multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const uploader = multer({storage: fileStorage, fileFilter: fileFilter});


router.post('/create-location-data', uploader.array('images', 5), (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No files uploaded'
    });
  }
  next();
}, createLocationData);



router.post('/get-location-data', getLocationData);


export default router;