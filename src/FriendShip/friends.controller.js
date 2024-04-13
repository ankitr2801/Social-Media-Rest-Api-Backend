
import friendRepository from "./friends.repository.js";
import ApplicationError from "../../error/applicationError.js";


class friendController{
    constructor(){
        this.friendRepository = new friendRepository();
    }

    async getFriend(req,res){
        const userId = req.userID;
        if(!userId){
            throw new ApplicationError("User id  not Reterived" , 400)
        }

        const result = await this.friendRepository.getFriends(userId);
        if(!result){
            throw new ApplicationError("No such Found " , 404)
        }
        return res.status(201).send({
            success:true,
            msg:"User Received",
            res:result.res
        })
    }
}

export default friendController;