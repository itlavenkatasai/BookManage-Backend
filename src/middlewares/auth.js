import Jwt  from "jsonwebtoken";

export const checkAndVerify = async (req,res,next) => {
    const {authorization} = req.headers;
    // console.log(authorization);
    try{
        if(authorization == null){
            return res.status(400).json({
                message:"authorization token missing"
            })
        }
        const authorizedData = authorization.split(" ");
        // console.log(authorizedData.length);
        if(authorizedData.length !== 2){
            return res.status(400).json({
                message:"invalid token"
            })
        }
        const [format,token] = authorizedData;
        if(format != 'Bearer'){
            return res.status(400).json({
                message:"invalid token"
            })
        }
        const {TOKEN_SECRET} = process.env;
        const payload = Jwt.verify(token,TOKEN_SECRET);
        const {email,userId} = payload;
        req.locals = {email,userId};
        // console.log("auth userId",userId);
        return next();
    }catch(error){
        console.log(error.message);
        const errorMessage = error.message;
        if(errorMessage = "jwt expired"){
            return res.status(500).json({
                message:"jwt token is expire please login again"
            })
        }
        if(errorMessage = "invalid signature"){
            return res.status(500).json({
                message:"wrong token given"
            })
        }
        return res.status(500).json({
            message: "failed to verify token"
        });
    }

}