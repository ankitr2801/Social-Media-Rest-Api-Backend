import express from "express";
import UserController from "./user.controller.js";


const userRouter = express.Router()

// create a instance for userController
const userController = new UserController();



userRouter.post("/signup", (req, res, next) => {
    userController.signup(req, res, next);
});

userRouter.post("/SignIn", (req, res) => {
    userController.signIn(req, res);
});

userRouter.get("/logOut", (req, res) => {
    userController.logOut(req, res);
});

userRouter.get("/get-details/:id", (req, res) => {
    userController.getDetails(req, res);
});

userRouter.get("/get-all-details", (req, res) => {
    userController.getAllDetails(req, res);
});

userRouter.put("/update-details/:id", (req, res) => {
    userController.updateDetails(req, res);
});
userRouter.get("/logout-all-devices", (req, res) => {
    userController.logOutAllDevice(req, res);
});




export default userRouter;
