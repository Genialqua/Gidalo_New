import path from 'path';
import express from 'express';
import allowCors from './config/allowCors.js';
import dotenv from 'dotenv'; // Load environment variables from .env file
import { fileURLToPath } from 'url'; // Necessary for __dirname in ES modules
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import favouriteRoutes from './routes/favouriteRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


// Environment configuration  
dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(allowCors((req, res, next) => next()));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Mount property routes at /api/properties
app.use('/api/properties', propertyRoutes);
// Mount user routes at /api/users
app.use('/api/users', userRoutes);
// Mount favourite routes at /api/favourites
app.use('/api/favourites', favouriteRoutes);
// Mount upload routes at /api/upload
app.use('/api/upload', uploadRoutes);

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use('/uploads', express.static('/var/data/uploads'));
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//    app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
// } else {
//   const __dirname = path.resolve();
//   app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
