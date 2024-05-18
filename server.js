import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './routes/Auth.js';
import postRoute from './routes/Post.js';
import cors from 'cors';
const app = express();
mongoose.set("strictQuery", true);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const connectDB=()=>{
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
}
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);
app.get("/",(req,res)=>{
    connectDB();
    return res.send("Hello from Homepage");
})


app.listen(8800,()=>{
    console.log('Server is running on port 8800');
});