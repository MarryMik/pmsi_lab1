import express from "express";
import mongoose from "mongoose";
import authRoute from "./routers/auth.js"
import usersRoute from "./routers/users.js"
import logsRoute from "./routers/logs.js"
import filesRoute from"./routers/files.js"
import reqistRoute from "./routers/register.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { writeUsers, writeRegisters, writeLogs} from "./utils/fileCreate.js";
import multer from "multer";
const app = express();

const connect = async ()=>{
    try{
        
        console.log("Підключено до бази даних.")
       
    }catch(error){
        throw error;
    }
}



writeUsers();
writeRegisters();
writeLogs();
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB відключено")
});
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
//організація збереження файлів в локальне сховище
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      callBack(null, "../frontend/src/upload");
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname+Date.now());
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    console.log("файл завантажено");
    res.status(200).json(file.filename);
  });

app.get('/', (req,res)=>{
    res.json("Привіт сервер!")
})
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/logs", logsRoute);
app.use("/logs",reqistRoute);
app.use("/files",filesRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Щось пішло не так!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const port = 3300;
app.listen(port, ()=>{
    connect();
    console.log("Підключено до серверу.")
})