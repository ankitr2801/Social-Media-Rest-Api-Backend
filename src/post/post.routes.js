import express from "express";
import { postController } from "./post.controller.js";
import { upload } from "../../middleware/fileUploadMiddleware.js";

const postRouter = express.Router()

const PostController = new postController();


postRouter.post("/" , upload.single("imageUrL"), (req,res,next)=>{
PostController.addPost(req,res,next)
})

postRouter.get("/all" , (req,res,next)=>{
PostController.getAll(req,res,next)
})

postRouter.get("/:id" , (req,res,next)=>{
PostController.getOne(req,res,next)
})

postRouter.delete("/:id" , (req,res,next)=>{
PostController.delete(req,res,next)
})

postRouter.put("/:id" , upload.single("imageUrL"), (req,res,next)=>{
PostController.Update(req,res,next)
})

export default postRouter;