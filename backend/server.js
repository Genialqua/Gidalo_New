import express from 'express';

import dotenv from 'dotenv'; // Load environment variables from.env file
dotenv.config();
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