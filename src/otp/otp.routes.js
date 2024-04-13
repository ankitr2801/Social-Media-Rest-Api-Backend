
import express from "express";
import otpController from "./otp.controller.js";


const otpRouter = express.Router()

const OtpController = new otpController();


otpRouter.post("/send" , (req,res,next)=>{
    OtpController.sendEmail(req,res,next)
})
otpRouter.post("/verify" , (req,res,next)=>{
    OtpController.verify(req,res,next)
})
otpRouter.post("/resetPassword" , (req,res,next)=>{
    OtpController.resetPassword(req,res,next)
})



export default otpRouter;