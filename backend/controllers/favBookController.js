import {FavBook} from '../models/favBookModel.js';
import asyncHandler from 'express-async-handler';



// @desc Check if a favorite book exists
// /api/favBook/isFavourite
// Helper Function
export const favExists = async (userId, olid) => {
    console.log(userId)
    const favBook = await FavBook.findOne({userId: userId.toString(), olid: olid});
    if (favBook) {
        return true;
    }
    return false;
}

// @desc Get the favourite
// /api/favBook/:id
// Protected Route - Requires a JWT token to access
export const getFavBook = asyncHandler(async(req, res) => {
    console.log(req.params.olid)
    console.log(req.user._id)
    const user = req.user._id.toString();
    const olid = req.params.olid;
    try {
        const favBook = await FavBook.findOne({userId: user, olid: olid});
        if (!favBook) {
            res.status(404);
        }
        res.json({
            data: favBook,
            message: "Book found in favorites!"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Book not found in favorites!")
    }
})

// @desc New Entry for User's Favorite Book
// POST /api/favBook/
// Protected Route - Requires a JWT token to access
export const postFavBook = asyncHandler(async(req, res) => {
    const exists =  await favExists(req.user._id.toString(), req.body.olid)
    if (exists) {
        res.status(400);
        throw new Error("Book already in favorites!")
    }
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
 })
//  export const postFavBook = asyncHandler(async(req, res) => {
    




//         if (favExists(req.user._id.toString(), req.body.olid)) {
//             res.status(400);
//             throw new Error("Book already in favorites!")
//         }
//         const newFavBook = new FavBook({
//             title: req.body.title,
//             userId: req.user._id,
//             olid: req.body.olid,
//         })
//         const favBookEntry = await FavBook.create(newFavBook);
//         return res.status(201).json({
//             data: favBookEntry,
//             message: "Book added to favorites!"
//         });
//  })


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
