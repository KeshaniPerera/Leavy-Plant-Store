import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import { mongoose } from 'mongoose';
import productRoutes from './routes/product.route.js';
import cors from 'cors'; // Import CORS middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

app.use(express.json()); // Allow us to accept JSON data in the req.body
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started on http://localhost:" + PORT);
});
