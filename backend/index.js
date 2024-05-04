import express from "express";
import {PORT, mongoDBURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import { Book } from "./models/bookModel.js";
import { validateBookFields } from "./helper.js";
import mongoose from "mongoose";


const app = express();
app.use(express.json()); // This middleware allows us to parse JSON data in the request body


app.get('/', (req, res) => {
}); 

app.use('/books', bookRoutes);


// Connect to MongoDB and start server
mongoose.connect(mongoDBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
});

