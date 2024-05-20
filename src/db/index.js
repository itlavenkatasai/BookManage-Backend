import mongoose from "mongoose";

export const dbConnectedToMongoDb = ()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/learn-node");
        console.log("db is connected to node")
    }catch(error){
        console.log("db is not connected to node");
        console.log(error)
    }
}