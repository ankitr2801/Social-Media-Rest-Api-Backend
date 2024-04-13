import mongoose from "mongoose";
import { UserSchema } from "./user.Schema.js";

const UserModel = mongoose.model("User", UserSchema);

class UserRepository {
  async signup(name, email, password, gender) {
    try {
      const result = await UserModel.create({ name, email, password, gender }); // Use create method directly
      await result.save();
      return { success: true, res: result };
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error("Something went wrong");
    }
  }

  async signIn(email, password) {
    try {
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        return {
          success: false,
          msg: "user not found",
        };
      } else {
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }

  async incrementToken(userID){
    const userAllLogout = await UserModel.findOneAndUpdate({userId:userID}, { $inc:{tokenVersion:1}, new:true})
    if (!userAllLogout) {
        throw new Error('User not found');
      }

      return { success: true, res: userAllLogout };
    } catch (err) {
      console.error('Error incrementing token version:', err);
      throw new Error('Failed to increment token version');
    }

  

  async getDetails(id){
    const userDetails = await UserModel.findOne({_id:id})
    // console.log("userDetails" , userDetails);
    return userDetails;
  }

  async getAllDetails(){
    const userAllDetails = await UserModel.find()
    return userAllDetails
  }

  async updatedDetails(id , UpdatedData){
    const updateDetails = await UserModel.findOneAndUpdate({_id:id} , {$set:UpdatedData} , {new:true})
    // console.log(updateDetails);
    if(updateDetails){
        return {
            success:true,
            res:updateDetails
        }
    } else {
        return {
            success: false,
            msg: "details not found",
          };
    }

  }
}

export default UserRepository;
