import express from 'express';

import dotenv from 'dotenv'; // Load environment variables from.env file
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
const port = process.env.PORT || 5001;

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());


if (process.env.NODE_ENV !== 'production') {
    // Set static folder // Serve static files from the client/build folder
    app.use(express.static(path.join(__dirname, '/frontend/build'))); 
    
    app.get('*', (req,res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);
} else {
    app.get('/', (req, res) =>{
        res.send('API is running.....');  // Send a message when the server is running in production mode
    })
}


app.get('/', (req, res) => {
    res.send('API is running'); 
});

app.use('/api/properties', propertyRoutes); // Mount property routes at /api/properties
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));




// app.get('/api/properties', (req, res) => {
//     res.json(properties); // Send properties data as JSON
// });

// app.get('/api/properties/:id', (req, res) => {
//     const property = properties.find((p) => p._id === req.params.id);
//     res.json(property); // Send the specific property data as JSON
    
// });