import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import mongoose from "mongoose";
import cors from 'cors';
const { mongoDBURL, PORT } = process.env;
import 'dotenv/config'



const app = express();
app.use(cors()); // Modify this to resctrict
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

