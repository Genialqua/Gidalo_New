import allowedOrigins from './allowedOrigins.js';
import cors from 'cors';

const corsOptions = {

    origin: '*', // Allow all origins
    optionsSuccessStatus: 200,

    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    // optionsSuccessStatus: 200,
};

export default corsOptions;