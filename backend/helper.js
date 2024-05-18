import express from 'express';

export function validateBookFields(req, res, next) {
    if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
    ) {
        return res.status(400).send({ message: "All fields are required" });
    }
    next();
}


// export function validateFavBookFields(req, res, next) {
//     if (
//         !req.body.title ||
//         !req.body.author ||
//         !req.body.publishYear
//     ) {
//         return res.status(400).send({ message: "All fields are required" });
//     }
//     next();
// }