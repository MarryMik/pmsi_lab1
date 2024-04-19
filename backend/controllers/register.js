import Reqisters from "../models/reqisters.js";
import { createError } from "../utils/error.js";
import {writeRegisters } from "../utils/fileCreate.js";

export const getRegisters = async(req,res,next)=>{
    try{
        const regs = await Reqisters.find();
        res.status(200).json(regs);
    }catch (err){
        next(err)
    }
}