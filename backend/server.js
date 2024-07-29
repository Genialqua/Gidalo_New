import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import dotenv from 'dotenv'; // Load environment variables from.env file
import path from 'path'; // Import path for handling and transforming file paths
import { fileURLToPath } from 'url'; // Necessary for __dirname in ES modules
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import credentials from './middleware/credentials.js';

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();



const app = express();

app.use(credentials);

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Necessary for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    // Set static folder // Serve static files from the client/build folder
    // app.use(express.static(path.join(__dirname, '/frontend/build'))); 
    
    // app.get('*', (req, res) =>
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    // );
// } else {
    app.get('/', (req, res) =>{
        res.send('API is running.....');  // Send a message when the server is running in production mode
    });
}

// Mount property routes at /api/properties now
app.use('/api/properties', propertyRoutes);
// Mount user routes at /api/users
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));




// import express from 'express';

// import dotenv from 'dotenv'; // Load environment variables from.env file
// dotenv.config();
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js'
// import { notFound,errorHandler } from './middleware/errorMiddleware.js';
// import propertyRoutes from './routes/propertyRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// const port = process.env.PORT || 5001;

// connectDB();

// const app = express();

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Cookie parser middleware
// app.use(cookieParser());


// if (process.env.NODE_ENV !== 'production') {
//     // Set static folder // Serve static files from the client/build folder
//     app.use(express.static(path.join(__dirname, '/frontend/build'))); 
    
//     app.get('*', (req,res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// );
// } else {
//     app.get('/', (req, res) =>{
//         res.send('API is running.....');  // Send a message when the server is running in production mode
//     })
// }


// app.get('/', (req, res) => {
//     res.send('API is running'); 
// });

// app.use('/api/properties', propertyRoutes); // Mount property routes at /api/properties
// app.use('/api/users', userRoutes);


// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server is running on port ${port}`));




// // app.get('/api/properties', (req, res) => {
// //     res.json(properties); // Send properties data as JSON
// // });

// // app.get('/api/properties/:id', (req, res) => {
// //     const property = properties.find((p) => p._id === req.params.id);
// //     res.json(property); // Send the specific property data as JSON
    
// // });