import express from 'express';
import { postFavBook, getFavBooksById, getAllFavBooks, getFavBook } from '../controllers/favBookController.js';
import { protect } from '../middleware/authMiddleware.js';


// Book Routing: Create, Read, Update, and Delete
// Utilizes the express Router in lieu of the app object
// To use, import the router object with and insert express.app.use('/books', bookRoutes)
// The router object is exported as router and all routes begin with /books

export const router = express.Router();

// Create a new favourite book entry
router.post('/', protect, postFavBook);

// Get all books in count, data json format
router.get('/all', getAllFavBooks);

// Get a all book by userid
router.post('/favourites', protect, getFavBooksById);

// Get a user's favourite book by id, and OLid
router.get('/:olid', protect, getFavBook);

export default router;