import jwt from"jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt"

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(req, res) {
        const { name, email, password, gender } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const result = await this.userRepository.signup(name, email, hashedPassword, gender);
            if (result.success) {
                res.status(201).json({
                    success: true,
                    msg: "user registration successful",
                    res: result.res,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create a new SignUp" });
        }
    }

    async signIn(req, res, next) {
        try {
            const userEmail = req.body.email;
            const user = await this.userRepository.signIn(userEmail);
            // console.log("req.body.password" ,req.body.password);
            console.log("user" , user);
            const result = await bcrypt.compare(req.body.password, user.password);
            console.log(result);
            if (result) {
                const token = jwt.sign(
                    {
                        userID: user._id,
                        email: user.email,
                    },
                    'WL5Fuf1RO83WCiEsP9VcNnYMEYGBiTP7',
                    {
                        expiresIn: "1h",
                    }
                );

                return res
                    .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
                    .json({ success: true, msg: "user login successful", token });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "user not found or invalid credentials",
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    }

    async logOut(req, res, next) {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No token provided",
            });
        }
        res.clearCookie('jwtToken');
        res.status(200).json({
            success: true,
            msg: "User logout successful",
        });
    }


    async logOutAllDevice(req, res, next) {
        const userID = req.userID;
        try {
            await this.userRepository.incrementToken(userID)
            res.clearCookie('jwtToken')
            return res.status(200).json({
                success: true,
                msg: "User logout  successfully from All Device",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to logout from all devices' });
        }
    }

    async getDetails(req, res, next) {
        const { id } = req.params
        console.log(id);
        const userDetails = await this.userRepository.getDetails(id)
        res.status(201).json({ success: true, userDetails })
    }

    async getAllDetails(req, res, next) {
        const userAllDetails = await this.userRepository.getAllDetails();
        if (!userAllDetails) {
            return {
                success: false,
                msg: "Details not found"
            }
        } else {
            return res.status(201).json({ success: true, userAllDetails })
        }
    }

    async updateDetails(req, res, next) {
        const { id } = req.params;
        const UpdatedData = req.body

        try {
            const update = await this.userRepository.updatedDetails(id, UpdatedData);

            if (update.success) {
                res.status(201).json({
                    success: true,
                    msg: "User Details Updated Successfully",
                    res: update.res,
                });
            } else {
                res.status(404).json({
                    success: false,
                    msg: "Details not found",
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to Update Details" });
        }
    }
}




