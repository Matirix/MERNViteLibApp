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
}, {
    timestamps: true,
})

export const FavBook = mongoose.model('FavBook', favBookSchema)