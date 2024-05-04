import express from 'express';
import { Book } from '../models/bookModel.js';
import { validateBookFields } from '../helper.js';

// Book Routing: Create, Read, Update, and Delete
// Utilizes the express Router in lieu of the app object
// To use, import the router object with and insert express.app.use('/books', bookRoutes)
// The router object is exported as router and all routes begin with /books

export const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        })
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Get all books in count, data json format
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error);}

})

// Get a single book by id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            return res.status(200).json({
                count: book.length,
                data: book});
        }
        return res.status(404).send({ message: "Book not found" });
    } catch (error) { 
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
})

// Deleting
router.delete('/:id', async (req, res) => {
    try {
        const { id} = req.params;     
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        } else {
            return res.status(200).send({ message: "Book deleted" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }

})

// Updating
router.put('/:id', validateBookFields, async (req, res) => {
    try {        
    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
        return res.status(404).send({ message: "Book not found" });
    } else {
        return res.status(200).send(result);
    }


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}
)


export default router;