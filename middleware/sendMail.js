

// 1. import node mailer
import nodemailer from'nodemailer';

// 2. configure mail and send it.

async function sendmail(email,otp){

    // 1 create a email transporter 
     // SMTP (simple mail transport protocol)

     const transporter = nodemailer.createTransport({
        service : "gmail",
        auth:{
            user:"ankitr280@gmail.com",
            pass:"cbjq vlhv tzub wsze",
        }
     });
// configue mail content.
const mailoptions = {
    from:"ankitr280@gmail.com",
    to:email,
    subject:"welcome to node js App",
    text:otp,
}

// 4 . send the mail
try{
    const result = await transporter.sendMail(mailoptions);
    console.log("Email sent successfully");
}catch(err){
    console.log('Email send failer with error: '+ err);
}
}


export default sendmail;


