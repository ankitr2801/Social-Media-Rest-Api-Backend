import express from "express";
import userRouter from "./src/user/user.routes.js";
import cookieParser from "cookie-parser";
import { connectUsingMongoose } from "./config/mongoose.js";
import postRouter from "./src/post/post.routes.js";
import commentRouter from "./src/comment/comment.routes.js";
import jwtAuth from "./middleware/jwtAuth.js";
import likeRouter from "./src/like/like.routes.js";
import otpRouter from "./src/otp/otp.routes.js";
import friendRouter from "./src/FriendShip/friends.routes.js";


// 2. Create Server
const server = express();

server.use(express.urlencoded({ extended: true })); 
server.use(express.json());
server.use(cookieParser())

server.use("/api/users" , userRouter)
server.use("/api/posts" ,jwtAuth, postRouter)
server.use("/api/comments" ,jwtAuth, commentRouter)
server.use("/api/likes" ,jwtAuth, likeRouter)
server.use("/api/otp" ,jwtAuth, otpRouter)
server.use("/api/friends" ,jwtAuth, friendRouter)

server.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APIs');
  });

  server.listen(8000, ()=>{
    console.log('Server is running at 8000');
    connectUsingMongoose();
  });