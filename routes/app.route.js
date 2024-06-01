import {Router} from 'express';


const router = Router();

import {createLocationData} from '../controllers/app.controller.js';
import {getLocationData} from "../controllers/app.controller.js";
import multer from "multer";


const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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