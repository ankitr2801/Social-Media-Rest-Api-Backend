
import mongoose from "mongoose"

export const postSchema = mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    imageUrL: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'like',
            required: true,
        }
    ]

})