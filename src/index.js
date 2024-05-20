import express from 'express';
import { dbConnectedToMongoDb } from './db/index.js';
import { createBookHandler, deleteBookByIdHandler, getBookByIdHandler, listBooksHandler, updateBookByIdHandler } from './handlers/Books.js';
import bodyParser from 'body-parser';

dbConnectedToMongoDb();

const app = express();
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use(bodyParser.json());
const port = 3000;

app.post("/books",createBookHandler);
app.get("/books",listBooksHandler);
app.get("/books/:id",getBookByIdHandler);
app.patch("/books/:id",updateBookByIdHandler);
app.delete("/books/:id",deleteBookByIdHandler);

app.listen(port,()=>{
    console.log("server is running on port" + port);
});