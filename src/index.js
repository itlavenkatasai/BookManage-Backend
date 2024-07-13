import express from 'express';
import { dbConnectedToMongoDb } from './db/index.js';
import { createBookHandler, deleteBookByIdHandler, getBookByIdHandler, listBooksHandler, loginHandler, registrationHandler, updateBookByIdHandler } from './handlers/index.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { checkAndVerify } from './middlewares/auth.js';
import cors from 'cors';

dotenv.config();
dbConnectedToMongoDb();

const app = express();

const corsOptions = {
    origin: true, // Change this to the origin you want to allow
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    "Access-Control-Allow-Origin": "*"
  };
// app.use(cors({
//     origin: 'http://localhost:1234'
//   }));
  
  // Apply CORS middleware
  app.use(cors(corsOptions));
  
  // Handle preflight requests for all routes
  app.options('*', cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("hello");
})
app.use(bodyParser.json());


app.post("/register",registrationHandler);
app.post("/login",loginHandler);

app.use("/books",checkAndVerify);

app.post("/books",createBookHandler);
app.get("/books",listBooksHandler);
app.get("/books/:id",getBookByIdHandler);
app.patch("/books/:id",updateBookByIdHandler);
app.delete("/books/:id",deleteBookByIdHandler);

const {PORT} = process.env;
app.listen(PORT,()=>{
    console.log("server is running on port " + PORT);
});

