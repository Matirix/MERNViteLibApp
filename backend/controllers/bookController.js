import express from 'express';
import { Book } from '../models/bookModel.js';
import { validateBookFields } from '../helper.js';
import asyncHandler from 'express-async-handler';

// Book Routing: Create, Read, Update, and Delete
// Utilizes the express Router in lieu of the app object
// To use, import the router object with and insert express.app.use('/books', bookRoutes)
// The router object is exported as router and all routes begin with /books

// @desc New book
// POST /api/books/
const postBook = asyncHandler(async(req, res) => {
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

// @desc Get all books in count, data json format
// GET /api/books/
const getBooks = asyncHandler(async(req, res) => {
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
// GET /api/books/:id
const getSingleBook = asyncHandler(async(req, res) => { 
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



// @desc Deleting a book
// DELETE /api/books/:id
const deleteBook = asyncHandler(async(req, res) => {
    try {
        console.log(req.params.id);
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


const updateBook = asyncHandler(async(req, res) => {
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
})

export { postBook, getBooks, getSingleBook, updateBook, deleteBook };