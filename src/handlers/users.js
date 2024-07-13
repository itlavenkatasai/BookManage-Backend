import { Users } from "../models/index.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registrationHandler = async (req, res) => {
  try{
    const { name, email, password, confirmPassword } = req.body;
    // console.log(name,email,password,confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
          message: "All fields are required"
      });
  }
  if (confirmPassword != password) {
    return res.status(400).json({
      message: "confirm password is not match with password",
    });
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser != null) {
    return res.status(409).json({
      message:
        "user is already existing with this email please enter new email",
    });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const userData = {
    name,
    email,
    password:hashedPassword,
    confirmPassword:hashedPassword
  };
  const createUser = await Users.create(userData);
  const responseData = { name, email, _id: createUser._id };
  return res.status(200).json({
    message: "user register sucessfully",
    data: responseData,
  });
  }catch(error){
    console.log(error);
    return res.status(500).json({
        message:"something went wrong please try again"
    })
  }
};

export const loginHandler = async (req,res)=>{
   try{
    const {email,password} = req.body;
    const existingUser =await  Users.findOne({email});
    if(!existingUser){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const isPasswordMatch = await bcryptjs.compareSync(password,existingUser.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"please enter valid password"
        })
    }
    const {TOKEN_SECRET,TOKEN_EXPIRY} = process.env;
    const token = await jwt.sign({email,useId: existingUser._id},TOKEN_SECRET,{expiresIn: TOKEN_EXPIRY});
    return res.status(200).json({
        data:token
    })
   }catch(error){
    console.log(error);
    return res.status(500).json({
        message:"something went wrong please try again"
    })
   }
}