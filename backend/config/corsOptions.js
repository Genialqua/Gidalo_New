import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET, POST, HEAD, PUT, PATCH, DELETE',],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    exposedHeaders: ['Content-type' ],
    optionsSuccessStatus: 200,
    preflightContinue: false,
    allowedHeaders: allowedOrigins,
    maxAge: 3600, // 1 hour in seconds
};

export default corsOptions;