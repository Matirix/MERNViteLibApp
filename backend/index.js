import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import mongoose from "mongoose";
import cors from 'cors';
const { mongoDBURL, PORT } = process.env;
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import 'dotenv/config'



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Modify this to resctrict
app.use(express.json()); // This middleware allows us to parse JSON data in the request body
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);


//
app.use(notFound);
app.use(errorHandler);
//



app.get('/', (req, res) => {
}); 



// Connect to MongoDB and start server
mongoose.connect(mongoDBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
});

