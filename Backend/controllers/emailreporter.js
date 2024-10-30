const express = require('express');
const nodemailer = require("nodemailer");
const dotenv = require("dorenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post("/send-email", async (res,req) =>{

    const{userEmail,userMessage} = req.body;
    
    const Transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        
        },

    });

    const mailOptions ={
        from:  process.env.EMAIL_ID,
        to: userEmail,
        subject: 'thank you for contacting us',
        text: userMessage


    };
    try{
        await Transport.sendMail(mailOptions);
        res.status(200).send(" Email sent");
    
    }
    catch(error){
        console.error(error);
        res.status(500).send(" Error sending email");

    }




})