import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
const app = express();
/*
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3300",
}))
*/
//app.use("/auth", authRouter);
//app.use("/users", userRouter);
/*
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack
    })
})
*/



mongoose.connect("")
.then(()=>console.log("DB is connected"))
.catch(()=>console.log("Error with db connection!"))
const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

const User = mongoose.model("users", UserSchema)
app.get('/', (req, res)=>{
   /* User.create({
        name: "user2",
        password: "12345",
        type:"user",
        status:"active"
    })
    .then((user)=> res.send(user))
    .catch((error)=>res.send(error))
    */
   User.find()
   .then((user)=> res.send(user))
    .catch((error)=>res.send(error))
})

const port = 3300;
const server = createServer(app);
server.listen(port, ()=>console.log("Smth"))