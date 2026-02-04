import express from "express";
import cors from "cors";
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import {rateLimiter }from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
dotenv.config();

const app= express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json()); //middleware
app.use(rateLimiter);
app.use('/api/notes',notesRoutes);
const port= process.env.PORT||5000;
connectDB().then(()=>{
app.listen(port,()=> {
    console.log(`Server running at ${port}`);
});
})


