import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {APP_PORT} from './config.js';

const app = express();
app.use(express.json());

app.use(cors());

import router from './routes/app.route.js'


app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

// Server is running here
app.listen(APP_PORT, () => {
  console.log('Server is running on port ' + APP_PORT);
});
