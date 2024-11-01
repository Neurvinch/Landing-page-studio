const express = require("express");
const session = require("express-session");
const axios = require("axios");

const app = express();

const client_id  = "your_client_id"; // need to assign the client id here

// as well as secret from env 
const client_secret ="";

// redirecting url 
const reDirectUrl = "";

// A session is a way to store information for each user while they’re visiting your app.
app.use(session({
    // security for tamper less sessions
    secret: 'your_secret',
    // we used to make false only save only when modified  while render 
    resave: false,
    // save the session to store session so when login they can use the store sessions if it is true 
    saveUninitialized: true,

}));

app.get(" the callback url after google that redircts here ", async(res,req) =>{
    // get the code from the query string
    const {code,state} =req.query;

    // getting the csrftoken in the session we stored in frontend locally 

    const storedState = req.session.recentCSRFToken;
// we compareing if it is not same then we sending the browser a plain text as error 
    if(state !== storedState){
        return res.statusCode(403).send(" possible attack detected ");
    }


    try{
        const tokenResponse = await axios.post(" to the google token url ",null // this region we used null as not send any payload(the body )
            ,{
                params:{

                    // we sending as params 
                    // need to config after we get the api from google console 
                    code,
                    client_id: client_id,
                    client_secret: client_secret,
                    reDirectUrl: reDirectUrl,

                    // we granted authorization code 
                    grant_type: "authorization_code",
                }
            })




        const{ acces_token, refresh_token} = tokenResponse.data;

// now we need to send the acces token to the google url to get the info of our user 
const userInfoGetting = await axios.get(" bro fill this with the url ",{
    // we send header to verify that we come from the right place to acces the data bro 
 headers: {
    Authorization : `Bearer ${acces_token}`
 }
})

//  now we assign the data from get request 

const user = userInfoGetting.data;

// we now saving the info to the session for further uses and to make user exp to top level
req.session.user = user;
req.session.acces_token =  acces_token;
req.session.refresh_token = refresh_token;

res.send(` vanakkam da mapla, ${req.session.user}`);
    }
    catch(error){
        console.log(error);
        res.statusCode(500).send("  something went wrong");


    }
})




