
import mongoose  from "mongoose";
import { friendSchema } from "./friends.Schema.js";
import { UserSchema } from "../user/user.Schema.js";
import ApplicationError from "../../error/applicationError.js";

const friendModel = mongoose.model('Friend' , friendSchema)
const userModel = mongoose.model('User' , UserSchema)


class friendRepository{

    async getFriends(userId){
        const user = await userModel.findById(userId);
                if (!user) {
                    throw new ApplicationError("User not found", 404);
                }

                const friends = await friendModel.find({
                $or:[
                {
                    user: userId,
                    status: "accepted"
                },
                {
                    friend:userId,
                    status: "accepted"
                }]
            }).populate('user', 'name').populate('friend', 'name', );
                if (friends.length === 0) {
                    throw new ApplicationError("User has no friends yet. Let's add someone.", 404);
                }
                return friends;
    }

}

export default friendRepository;