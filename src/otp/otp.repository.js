import mongoose from "mongoose";
import { otpSchema } from "./otp.Schema.js";
import { UserSchema } from "../user/user.Schema.js";
import otpGenerator from "otp-generator";
import ApplicationError from "../../error/applicationError.js";
import sendmail from "../../middleware/sendMail.js";


const otpModel = mongoose.model("Otp", otpSchema)
const userModel = mongoose.model('User', UserSchema)

let otp = null;
class otpRepositpry {
    async send(email) {
        try {
            const isUser = await userModel.findOne({ email: email });
            console.log(isUser);
            if (!isUser) {
                throw new ApplicationError("No email found", 400);
            }

            otp = otpGenerator.generate(6, {
                digit: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });

            const newOtp = new otpModel({
                otp,
                user: email,
            });

            await newOtp.save();

            // Assuming sendMail is an asynchronous function that returns a promise
            sendmail(email, otp)


            return otp
        } catch (error) {
            console.error("Error sending OTP:", error.message);
            throw error;
        }
    }

    async verifyOtp(email, otp) {
        const isUser = await userModel.findOne({ email: email });
        console.log(isUser);
        if (!isUser) {
            throw new ApplicationError("No email found", 400);
        }

        const otprecord = await otpModel.findOne({ otp, email });
        if (!otprecord) {
            {
                throw new ApplicationError("Invalid OTP.", 400);
            }
        }

        const otpduration = 60 * 1000;
        if (otprecord.createdAt.getTime() + otpduration < Date.now()) {
            throw new ApplicationError("Expired OTP.", 400);
        }
        return true;
    }

    async reset(userId, hashedPassword) {
        console.log("hashedPassword" ,hashedPassword);
        let user = await userModel.findById(userId);
        console.log(user);
        if (!user) {
            throw new Error("No such user found");
        } 
        user.password = hashedPassword;
        await user.save();
        console.log(user);
        return user;

    }
}


export default otpRepositpry;