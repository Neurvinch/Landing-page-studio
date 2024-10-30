// create order 
// verify the payement
//install razorpay cors express dotenv
// add type: module
const RazorPay = require ('razorpay');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express()

app.use(cors());
app.use(express.json());
dotenv.config();


const RAZORPAY_KEY_ID =process.env.RAZORPAY_ID
const RAZORPAY_KEY = process.env.RAZORPAY_KEY
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET

const razorpay = new RazorPay({
    key_id: "RAZORPAY_KEY_ID",
    key_secret: "RAZORPAY_SECRET"
})


app.post("/order",async (res,req) =>{
    console.log("create order");
    console.log("body",req.body)

try{
    const options ={
        amount: req.body.amount*100,
        currency:"INR",
        receipt:"receipt " + Math.random().toString(36).substring(7),
    };
    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json(order);// sending back to clent the order derials
}
catch(error){
    res.status(500).send("not able to create order,try again!")

}
})

// verify the payemnet
app.post("/verify-payement", async (res,req) =>{
    console.log("verify payement");

 try{
    const{razorpay_order_id,razor_payment_id,razorpay_signature} =req.body

    const sign = razorpay_order_id +"|"+razor_payment_id;

    const expected_one_sign = crypto.createHmac('sha256',RAZORPAY_SECRET).update(sign.toString()).digest('hex');

    if(expected_one_sign === razorpay_signature){
        console.log("payment verified");
        res.status(200).json({message:"payment verified"})
        }
        else{
            console.log("payment not verified");
            res.status(400).json({message:"payment not verified"});
        }
    }
    catch(error){
        res.status(500).send("not able to verify payment,try again!")
        }


});
