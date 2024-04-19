import Logs from "../models/logs.js";
import { createError } from "../utils/error.js";

export const getLogs = async(req,res,next)=>{
    try{
        const logs = await Logs.find();
        res.status(200).json(logs);
    }catch (err){
        next(err)
    }
}