const jwt = rquire("jsonwebtoken");

module.exports = (req,res,next) =>{
    const token = req.header('authorization')?.replace('Bearer','');

    if(!token){
       return res.staus(401).json({message:" no token provided, denied"});


    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch(errror){
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({message:"token expired, denied"});
        }
res.status(401).json({message:"Token is not valid"})
    }
};