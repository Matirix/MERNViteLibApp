import mongoose from "mongoose"

const favBookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    olid: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    },
    // author_name: {
    //     type: String,
    //     required: true
    // },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
    }

}, {
    timestamps: true,
})

export const FavBook = mongoose.model('FavBook', favBookSchema)