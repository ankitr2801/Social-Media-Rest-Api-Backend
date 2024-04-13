import express from "express";
import commentController from "./comment.controller.js";


const commentRouter = express.Router()

// create a instance for userController
const CommentController = new commentController();



commentRouter.post("/:postid", (req, res, next) => {
    CommentController.add(req, res, next);
});
commentRouter.get("/:postid", (req, res, next) => {
    CommentController.getComment(req, res, next);
});

commentRouter.put("/:commentId", (req, res, next) => {
    CommentController.updateComment(req, res, next);
});
commentRouter.delete("/:commentId", (req, res, next) => {
    CommentController.delete(req, res, next);
});


export default commentRouter;





