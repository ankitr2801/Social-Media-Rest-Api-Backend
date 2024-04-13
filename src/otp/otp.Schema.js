
import mongoose  from "mongoose"


export const otpSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60,
    }
})