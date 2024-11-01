const bcrypt =require('bcrypt'); // for hashing passwords
const jwt = require ('jsonwebtoken'); // for generating token bro

exports.register = async (res,req ) => {
    try {
        const{username,email,password} = req.body;

        // check bro if the user already exist
        const existingUser = await username.findOne({email});
        if(existingUser){
            return res.staus(400).json({message:"user already exists"})
        }
        // hash the password bro
        const hashedPassword = await bcrypt.hash(password,20);

        // create a new user

        const user =new User({username,email,password: hashedPassword});
        await user.save();

        res.satus(201).json({message:"user registered succesfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"failed to register a user"})
    }
};

exports.login = async(res,req)=>{
    try{
        const {username,password} = req.body;

        // check if user is exist
        const user = await User.findone({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        // check if passcode is correct or not bro
        const ifMatch = await bcrypt.compare(password,user.password);
        if(!ifMatch){
            res.staus(400).josn({message:"password is incorrect"})
        }
        // generate token bro
        const token =jwt.sign({id: user.id},process.loadEnvFile.JWT_TOKEN,{expiresIn:'2h'});

        res.json({messgae:"Login succesful",token});

    }
catch(error){
    console.error(error);
    res.status(400).json({message:'error while logging in'});
}

};

exports.logout =(req,res) =>{
    res.json({message:"user loggd out successfully"})
};

