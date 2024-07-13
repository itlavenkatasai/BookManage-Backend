import mongoose from "mongoose";

export const dbConnectedToMongoDb = ()=>{
    const {ATLAS_URL} = process.env;
    try{
        mongoose.connect(ATLAS_URL);
        console.log("db is connected to node")
    }catch(error){
        console.log("db is not connected to node");
        console.log(error)
    }
}