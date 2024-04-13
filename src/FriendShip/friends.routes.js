
import express from "express";
import friendController from "./friends.controller.js";


const friendRouter = express.Router()

const FriendController = new friendController();


friendRouter.get("/get-friends/:id" , (req,res,next)=>{
    FriendController.getFriend(req,res,next)
})




export default friendRouter;