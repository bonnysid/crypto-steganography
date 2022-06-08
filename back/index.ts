import express from 'express';
import cors from 'cors';
import router from './router';
import errorMiddleware from './middlewares/errorMiddleware';
import fileUpload from 'express-fileupload';
import * as path from 'path';

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

export const IMAGES_PATH = path.join(__dirname, 'images');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server was started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
};

start();
