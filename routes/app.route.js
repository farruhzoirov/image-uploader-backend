import * as path from "path";
import {v4 as uuidv4} from 'uuid';

import {Router} from 'express';

const router = Router();


import {createLocationData, getAllData, getLocationData} from '../controllers/app.controller.js';
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

router.post('/create-location-data', uploader.array('images', 5), createLocationData);

router.get('/get-all-data', getAllData);

router.post('/get-location-data', getLocationData);


export default router;