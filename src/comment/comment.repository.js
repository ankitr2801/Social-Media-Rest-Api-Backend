import mongoose from "mongoose";
import commentSchema from "./comment.Schema.js";
import { postSchema } from "../post/post.Schema.js";
import ApplicationError from "../../error/applicationError.js";

const commentModel = mongoose.model("Comment", commentSchema)
const postModel = mongoose.model("Post", postSchema)

class commentRepository {
  async addComment(content, postid, userId) {
    try {
      console.log(postid);
      // Check if the post with the given postid exists
      const post = await postModel.findById(postid);
      if (!post) {
        throw new ApplicationError("No post found on this id", 404);
      } else {
        // If the post is valid, create the comment
        const commentDetails = await commentModel.create({ content, postid, userId });
        console.log('commentDetails', commentDetails);
        const savedComment = await commentDetails.save();
        post.comments.push(savedComment);
        await post.save()
        return { success: true, res: commentDetails };
      }
    } catch (err) {
      console.error('Error creating comment:', err);
      throw new Error('Something went wrong');
    }
  }

  async getComments(postid) {
    try {
      const post = await postModel.findById(postid);
      console.log(post);
      if (!post) {
        throw new ApplicationError("No post found on this id", 404);
      }

      const comments = await commentModel.find({ postid: (postid) }).populate({ path: 'userId', select: 'name email _id' })
      console.log("comments" , comments);

      if (!comments || comments.length === 0) {
        throw new ApplicationError("No comments found on this post.", 404);
      } else {
        return comments
      }
    } catch (err) {
      console.error('Error retrieving comments:', err);
      throw new Error('Something went wrong');
    }
  }


  async updateComments(commentId, updatedData, userId) {
    const commentToUpdate = await commentModel.findById(commentId)
    if (!commentToUpdate) {
      throw new ApplicationError("No comment found with this ID", 404);
    }
    if (String(commentToUpdate.userId) !== userId) {
      throw new ApplicationError("You are not allowed to update this comment", 403);
    }
    commentToUpdate.content = updatedData; 
    const updatedComment = await commentToUpdate.save();
    return updatedComment.populate({
      path: 'userId',
      select: 'name email _id' 
    });
  }

  async deleteComments(commentId , userId){
    const comment = await commentModel.findById(commentId);
    if(!comment)
    {
        throw new  ApplicationError("No comment found on this id", 404);
    }
    if(String(comment.userId) !== userId)
    {
        throw new  ApplicationError("You are not allowed to delete this comment.", 404);
    }
    const post = await postModel.findById(comment.postid)
    if(!post){
      throw new ApplicationError(" post not found.", 404);
    }
     // Remove comment ID from post's comments array
     const index = post.comments.indexOf(commentId);
     if (index != -1) {
         post.comments.splice(index, 1);
         await post.save();
     }
     const result = await commentModel.findByIdAndDelete(commentId);
     return result;
  }
}


export default commentRepository;