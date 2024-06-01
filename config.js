import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve('./config.env') });

export const APP_PORT = process.env.APP_PORT;
