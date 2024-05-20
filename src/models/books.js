import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    year:{type:Date}
})

export const Book = mongoose.model('Books',bookSchema);