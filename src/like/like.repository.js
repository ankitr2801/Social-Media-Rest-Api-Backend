import  mongoose  from "mongoose";
import { likeSchme } from "./like.Schema.js";
import { postSchema } from "../post/post.Schema.js";
import commentSchema from "../comment/comment.Schema.js";
import ApplicationError from "../../error/applicationError.js";


const likeModel = mongoose.model("like" , likeSchme)
const postModel = mongoose.model("Post" ,postSchema)
const commentModel = mongoose.model('Comment' , commentSchema)

class likeRepository{

  async toggle(likeableId, type, userId){
        console.log("likeableId", likeableId);
      
        let likeable;

          if (type === "Post") {
            likeable = await postModel.findById(likeableId);
          } else if (type === "Comment") {
            likeable = await commentModel.findById(likeableId);
            console.log("likeable", likeable);
          }
      
          if (!likeable) {
            throw new Error(`No ${type.toLowerCase()} found for this id`);
          }
      
          const newLike = new likeModel({
            user: userId,
            likeable: likeableId,
            on_model: type,
          });
      
          console.log("newLike", newLike);
      
          const liked = await newLike.save();
      
          if (liked) {
            // Use findOneAndUpdate for atomic update
            const updatedLikeable = await likeModel.findOneAndUpdate(
              { likeable: likeableId },
              { $push: { likes: newLike.likeable } },
              { new: true }
            ).populate({
                path: 'user', // populate user details
                select: 'name email _id', // specify fields to include
              })
              .populate({
                path: 'likeable', // populate likeable details
                // Assuming you have a model for likeable entity (e.g., PostModel, CommentModel)
                select: 'content _id', // specify fields to include
              });;
              console.log(updatedLikeable);
      
            return {res: {newLike, updatedLikeable }};
          }
        }

        async getLikes(id,type){
            let likeable;
            if (type === 'Post') {
                likeable = await postModel.findById(id);
            } else if (type === 'Comment') {
                likeable = await commentModel.findById(id);
                console.log(likeable);
            }

            if (!likeable) {
                throw new ApplicationError(`No ${type.toLowerCase()} found with this ID.`, 404);
            }

            const likes = await likeModel.find({ likeable: id, on_model: type })
            .populate({
                path: 'user',
                select: 'name email _id' // Specify the fields to include
            }).populate('likeable');

            if (likes.length === 0) {
                throw new ApplicationError(`There are no likes for this ${type.toLowerCase()}.`, 404);
            }

            return likes;
        } catch (error) {
            handleDatabaseError(error);
        }
        }
    
    

      
    
      


export default likeRepository;