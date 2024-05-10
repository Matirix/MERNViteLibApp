import express from 'express';
import { Book } from '../models/bookModel.js';
import { validateBookFields } from '../helper.js';
import {postBook, getBooks, getSingleBook, updateBook, deleteBook} from '../controllers/bookController.js';


// Book Routing: Create, Read, Update, and Delete
// Utilizes the express Router in lieu of the app object
// To use, import the router object with and insert express.app.use('/books', bookRoutes)
// The router object is exported as router and all routes begin with /books

export const router = express.Router();

router.post('/', validateBookFields, postBook);

// Get all books in count, data json format
router.get('/', getBooks);

// Get a single book by id
router.get('/:id', getSingleBook);

// Deleting
router.delete('/:id', deleteBook)

// Updating
router.put('/:id', validateBookFields, updateBook);


export default router;