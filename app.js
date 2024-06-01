import path from 'path';
import express from 'express';
import cors from 'cors';

import { APP_PORT } from './config.js';

const app = express();
app.use(express.json());

app.use(cors({origin: 'https://farruhzoirov.uz'}));

import router  from './routes/app.route.js'



app.use(express.static(path.join(path.resolve(), 'frontend')));
app.use('/images', express.static('images'));

app.use(router)

// Server is running here
app.listen(APP_PORT, () => {
  console.log('Server is running on port ' + APP_PORT);
});
