import mongoose from "mongoose";
import path from "path";

import { postSchema } from "./post.Schema.js";

const postModel = mongoose.model('Post' , postSchema)

class postRepository{
    async add(caption , imageUrL ,userId){
        try {
            const result = await postModel.create({ caption , imageUrL ,userId}); 
            console.log(result);
            await result.save();
            return { success: true, res: result };
          } catch (err) {
            console.error("Error creating user:", err);
            throw new Error("Something went wrong");
          }
        }

        async getAlls(){
          const postDetails = await postModel.find();
          return postDetails;
        }

        async getOnePost( id , userId){
          console.log(userId);
          const postDetails = await postModel.findOne({_id:id});
          return postDetails;
        }

        async DeletePost(id){
          const isDeleted = await postModel.findOneAndDelete({_id:id});
          console.log(isDeleted);
          return isDeleted;
        }

        async UpdateData(id,formData,uploadedFile , userId){
       
        const updatedData = { ...formData,     imageUrL: uploadedFile ? uploadedFile.filename : undefined };
        const result = await postModel.findOneAndUpdate({_id:id , userID: userId } , {$set:updatedData} , {new:true})
        return result;
    }
  }
export default postRepository;