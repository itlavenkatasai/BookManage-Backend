import exp from "constants";
import { Book } from "../models/index.js";

export const createBookHandler = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const bookDetails = {
      title,
      author,
      genre,
      year,
    };
    const book = await Book.create(bookDetails);
    return res.status(200).json({
      message: "book create sucessfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong please try again",
    });
  }
};

export const listBooksHandler = async (req, res) => {
  try {
    const {userId} = req.locals;
    const books = await Book.find({userId});
    return res.status(200).json({
      message: "Books list get sucessfully",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "something went wrong please try again",
    });
  }
};

export const getBookByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const bookById = await Book.findById(id);
    return res.status(200).json({
      message: "book get By id sucessfully",
      data: bookById,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "something went wrong please try again",
    });
  }
};

export const updateBookByIdHandler = async (req,res)=>{
    try{
        const {id} = req.params;
    const {title,author,genre,year} = req.body;
    const updateBook = await Book.findByIdAndUpdate(id,{title,author,genre,year},{"returnDocument":"after"});
    return res.status(200).json({
        message:"update book details sucessfully",
        data :updateBook
    })
    }catch(error){
        console.log(error);
    return res.status(200).json({
      message: "something went wrong please try again",
    });
    }
}

export const deleteBookByIdHandler = async (req,res)=>{
    try{
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        return res.status(200).json({
            message:"book deleted sucessfully"
        })
    }catch(error){
        console.log(error);
    return res.status(200).json({
      message: "something went wrong please try again",
    });
    }
}
