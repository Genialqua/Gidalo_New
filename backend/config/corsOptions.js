import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 3600, // 1 hour in seconds
};

export default corsOptions;




// const corsOptions = {
//     origin: ['https://gidalo-new-frontend-6w47xhtpa.vercel.app', 'http://localhost:3000'],
//     credentials: true,
//     methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
//     exposedHeaders: ['Content-Type'],
//     optionsSuccessStatus: 200,
//     preflightContinue: false,
//     maxAge: 3600, // 1 hour in seconds
//   };
  
//   export default corsOptions;







// import allowedOrigins from './allowedOrigins.js';

// const corsOptions = {
//     origin: ['https://gidalo-new-frontend-6w47xhtpa.vercel.app', "http://localhost:3000" ],
//     credentials: true,
//     methods: ['GET, POST, HEAD, PUT, PATCH, DELETE',],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
//     exposedHeaders: ['Content-type' ],
//     optionsSuccessStatus: 200,
//     preflightContinue: false,
//     allowedHeaders: allowedOrigins,
//     maxAge: 3600, // 1 hour in seconds
// };

// export default corsOptions;