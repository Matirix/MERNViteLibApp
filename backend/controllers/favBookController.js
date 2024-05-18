import {FavBook} from '../models/favBookModel.js';
import asyncHandler from 'express-async-handler';


// @desc New Entry for User's Favorite Book
// POST /api/favBook/
 export const postFavBook = asyncHandler(async(req, res) => {
    console.log(req.body);
    try {
        // Check if it exists
        const favBook = await FavBook.findOne({userId: req.user._id, olid: req.body.olid});
        if (favBook) {
            res.status(400);
            throw new Error("Book already in favorites!")
        }

        //Create new Entry
        const newFavBook = new FavBook({
            title: req.body.title,
            userId: req.user._id,
            olid: req.body.olid,
        })
        const favBookEntry = await FavBook.create(newFavBook);
        return res.status(201).json({
            data: favBookEntry,
            message: "Book added to favorites!"
        });

    } catch (error) {
        console.log(error);
        throw new Error("Books not found!")
    }
 })


// @desc Get all favorite books by user id and count, data json format
// POST /api/favBook/
// Protected Route - Requires a JWT token to access
 export const getFavBooksById = asyncHandler(async(req, res) => {
    try {
        const favBooks = await FavBook.find({userId: req.user._id});
        return res.status(200).json({
            data: favBooks,
            count: favBooks.length
        }) 
    } catch (error) {
        console.log(error);
        throw new Error("Books not found!")
    }
 })


// @desc Get all favorite (no matter who) books and count, data json format
// GET /api/favBook/all
 export const getAllFavBooks = asyncHandler(async(req, res) => {
    try {
        const favBooks = await FavBook.find({});
        return res.status(200).json({
            data: favBooks,
            count: favBooks.length
        }) 
    } catch (error) {
        console.log(error);
        throw new Error("Books not found!")
    }
 })
