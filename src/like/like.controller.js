
import likeRepository from "./like.repository.js";
import ApplicationError from "../../error/applicationError.js";

class likeController{
    constructor(){
        this.likeRepository = new likeRepository()
    }

    async toggleLikes(req, res){
        const {id} = req.params;
        const {type} = req.query;
        const userId = req.userID;
        if(!userId)
        {
            throw new ApplicationError("User Id not recieved.", 400);
        }
        if(!id)
        {
            throw new ApplicationError("Id not recieved enter id.", 400);
        }
        if(type != 'Post' && type != 'Comment')
        {
            throw new ApplicationError("Enter a valid type ie 'Post' or 'Comment'", 400);
        }

        const result = await this.likeRepository.toggle(id,type,userId)
        if(!result){
            throw new ApplicationError("Like not added something went wrong.", 404);
        }
        return res.status(200).json({
            success: true,
            msg:"Like added",
           res :result.res
        })
    }

    async getLikes(req,res){
        const id = req.params.id;
        const type = req.query.type;
        if(type != 'Post' && type != 'Comment')
        {
            throw new ApplicationError("Enter a valid type ie 'Post' or 'Comment'", 400);
        }
        if(!id)
        {
            throw new ApplicationError("Id not recieved enter id.", 400);
        }
        const likes = await this.likeRepository.getLikes(id,type);
        if(!likes)
        {
            throw new ApplicationError("Likes not retrieved something went wrong.", 404);
        }
        return res.status(200).json({
            success: true,
            likes: likes,
            msg: "likes retrieved."
        })


    }
}

export default likeController;