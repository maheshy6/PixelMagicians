const nodemailer = require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service:"GMAIL",
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

exports.sendEmail=async(to,subject,html,retry=3)=>{
    const mailOptions={
        from:process.env.USER,
        to,
        subject,
        html
    }
    for(let i=1;i<=retry;i++){
        try {
            await transporter.sendMail(mailOptions)
            //console.log(` send email to = ${to} attempt = ${i}`)
            return true
        } 
        catch (error) {
            //console.log(`failed to send email to = ${to} attempt = ${i}`)
            if(i==retry){
                //console.log(`failed to send email to = ${to} attempt = ${i}`)
            }
            return false
        }

    }
}

