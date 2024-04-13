import mongoose from "mongoose";
import commentRepository from "./comment.repository.js";
import ApplicationError from "../../error/applicationError.js";



class commentController {
  constructor() {
    this.commentRepository = new commentRepository();
  }

  async add(req, res) {
    try {
      const { content } = req.body;
      const { postid } = req.params;
      const userId = req.userID
      if (!content) {
        throw new ApplicationError("Enter content.", 400);
      }
      if (!postid) {
        throw new ApplicationError("Enter post id.", 400);
      }
      const comment = await this.commentRepository.addComment(content, postid, userId);
      // console.log("comment" , comment);

      if (comment.success) {
        return res.status(201).json({
          success: true,
          msg: 'New Comment created successfully',
          res: comment.res,
        });
      } else {
        {
          throw new ApplicationError("New comment not added on this post something went wrong.", 400);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
  }

  async getComment(req, res) {
    const { postid } = req.params
    // console.log("req.params" , req.params);
    // console.log("userid" , userid);
    console.log(postid);
    const commentDetails = await this.commentRepository.getComments(postid);
    console.log(commentDetails);
    if (!commentDetails || commentDetails.length == 0) {
      throw new ApplicationError("Comments not retrieved something went wrong.", 400);
    } else {
      return res.status(200).json({
        success: true,
        comments: commentDetails,
        msg: "Comments retrieved."
      })
    }
  }


  async updateComment(req, res) {
    const  commentId  = req.params.commentId;
    const  {content}  = req.body;
    const userId = req.userID;
    console.log("commentId" ,commentId);
    console.log("content" ,content);
 
 
    if (!content) {
      throw new ApplicationError("Enter content to update.", 400);
    }
    if (!commentId) {
      throw new ApplicationError("Comment id not recieved enter comment id.", 400);
    }

    const isupdated = await this.commentRepository.updateComments(commentId, content, userId)
    if (!isupdated) {
      throw new ApplicationError("Comment not updated something went wrong.", 400);
    }
      return res.status(201).json({
        success: true,
        comment: isupdated,
        msg: "Comment updated!"
      })
    }

    async delete(req,res){
      const {commentId} = req.params;
      const userId = req.userID;
      if (!commentId) {
        throw new ApplicationError("Comment id not recieved enter comment id.", 400);
      }

      const isDeleted = await this.commentRepository.deleteComments(commentId,userId)
      if (!isDeleted) {
        throw new ApplicationError("Comment not updated something went wrong.", 400);
      }
        return res.status(201).json({
          success: true,
          comment: isDeleted,
          msg: "Comment Deleted!"
        })
    }
  }


export default commentController;
