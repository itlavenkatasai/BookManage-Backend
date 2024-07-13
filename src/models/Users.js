import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
});

export const Users = mongoose.model("BooksUsers", userSchema);
