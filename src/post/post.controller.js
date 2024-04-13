import PostRepository from "./post.repository.js";
import path from "path";

export class postController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  
async addPost(req, res) {
    const { caption  } = req.body;
   const userId= req.userID;
    console.log(userId);
    console.log(req.body);
    try{
    const add = await this.postRepository.add(caption, req.file.filename ,userId);
    console.log(add);
    if (add.success) {
        return res.status(201).json({
            success: true,
            msg: 'Post created successfully',
            res: add.res,
        });
    }   else {
        return res.status(400).json({success:false , msg:"post not found"})
    }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new post' });
    }
  }

  async getAll(req,res){
    const postDetails = await this.postRepository.getAlls();
        if (!postDetails) {
            return {
                success: false,
                msg: "Details not found"
            }
        } else {
            return res.status(201).json({ success: true, postDetails })
        }
  }
  async getOne(req,res){
    const userId = req.userID;
    console.log(userId);
    const { id } = req.params
    const postDetails = await this.postRepository.getOnePost(id);
        if (!postDetails) {
            return {
                success: false,
                msg: "Details not found"
            }
        } else {
            return res.status(201).json({ success: true, postDetails })
        }
  }

  async delete(req,res){
    const {id} = req.params;
    console.log(id);
    const isDeleted = await this.postRepository.DeletePost(id);
    if(isDeleted){
        return res.status(201).json({ success:true , msg:"Post Delete Successfully" , isDeleted})
    } else {
        return res.status(400).json({sucess:false , msg:"DeletePost not Found"})
    }
  }

  async Update(req, res) {
    const { id } = req.params;
    const userId = req.userID
    const formData = req.body;  
     const uploadedFile = req.file;    // Assuming you have some data update logic here   
     // For example, updating a database record with the form data and file information
     if(formData === undefined || uploadedFile === undefined){
        return res.status(400).send("please provide right data for feching ")
     }
        const updatedDetails = await this.postRepository.UpdateData(id,formData,uploadedFile,userId)
    if (updatedDetails) {
      return res.status(201).json({ success: true, msg: "post Updated Successfully", updatedDetails });
    } else {
      return res.status(400).json({ success: false, msg: "Post not found" });
    }
    }
  }
  


