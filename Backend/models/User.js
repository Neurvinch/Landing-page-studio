const mongoose = require('mongoose');


const userschema = new mongoose.schma({
    username:{
        type:String,
        required: [true, 'username is required'],
        trim: true,
        minlength :[3,'username is too short'],
        maxlength : [33,'username is too long']

    },
    email:{
        type:string,
        required: [true,'email is required'],
        unique: true,
        trim :true,
        lowercase: true,
        match :[/.+@.\..+/,'pls enter a valid email address']
    },
    password:{
        type:string,
        required:[true,'password is required'],
        minlength:[8,'password is too short']
    },
});

// remove the password from th output quires
userschema.set('toJson',{
    transform :(doc,ret) =>{
delete ret.password;
return ret;
    }
});

module.exports = mongoose.model('User',userschema);