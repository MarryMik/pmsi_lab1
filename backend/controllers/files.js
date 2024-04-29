import Files from "../models/files.js";
import { createError } from "../utils/error.js";
  
export const createFile = async(req,res,next)=>{
    try{
        

        const newFile = new Files({
            time: req.body.time,
            filename: req.body.filename,
            size: req.body.size,
            username: req.body.username,
            userid: req.body.userid
        });
        await newFile.save();
        res.status(200).send("Файл було додано.");
    }catch(err){
        next(err);  
    }
}

export const getFiles = async(req,res,next)=>{
    try{
        const files = await Files.find({userid:req.params.id});
        res.status(200).json(files);
    }catch(err){
        next(err);
    }
}



export const updateFile = async(req,res,next)=>{
    try{
        const file = await Files.findById(req.params.id);
        if(!file)return next (createError(404, "Файла не знайдено!"));
        const updateFile = await Files.findByIdAndUpdate(
            file._id,
            {$set: req.body}
        );
        res.status(200).json(updateFile);
    }catch(err){
        next(err);
    }
}
export const deleteFile = async(req,res,next)=>{
    try{
        await Files.findByIdAndDelete(req.params.id);
        res.status(200). json("Файл було видалено");
    }catch(err){
        next(err);
    }
}