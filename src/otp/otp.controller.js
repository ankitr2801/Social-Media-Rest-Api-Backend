import ApplicationError from "../../error/applicationError.js";
import OtpRepositpry from "./otp.repository.js";
import bcrypt from "bcrypt"


class otpController {
    constructor() {
        this.otpRepositpry = new OtpRepositpry();
    }

    async sendEmail(req, res) {
        const { email } = req.body;
        console.log(email);

        const otp = await this.otpRepositpry.send(email)
        if (!otp) {
            throw new ApplicationError("Otp not send something went wrong.", 404);
        }
        return res.status(200).send({
            success: true,
            msg: `otp send to ${email} valid for 1 minute.`,
            res: otp.res
        })
    }

    async verify(req, res) {
        const { email, otp } = req.body;
        console.log(req.body);
        if (!email || !otp) {
            throw new ApplicationError("Enter email and otp both.", 400);
        }
        const result = await this.otpRepositpry.verifyOtp(otp)
        console.log(result);
        if (!result) {
            throw new ApplicationError("result not found")
        }
        return {
            success: true,
            msg: "Verify Otp successful you can chnage password now ",
            res: result.res
        }
    }



    async resetPassword(req, res) {
        const { newpassword } = req.body;
        const hashedPassword = await bcrypt.hash(newpassword, 12)
        const userId = req.userID;

        const user = await this.otpRepositpry.reset(userId , hashedPassword)
        console.log(user);
        if(!user){
            throw ApplicationError("User is not found " , 404)
        } 
        return res.status(201).send("password is updated")
    }
}




export default otpController;