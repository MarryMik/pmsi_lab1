import User from "../models/user.js"; 
import Reqisters from "../models/reqisters.js";
import Logs from "../models/logs.js";
import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"
import bcrypt from "bcryptjs";
import { writeUsers,writeLogs,writeRegisters } from "../utils/fileCreate.js";
import { crypt } from "../utils/cryps.js";
import { randNumb } from "../utils/cryps.js";
let rand;
export const register = async (req,res, next)=>{
    try{
       // const salt = bcrypt.genSaltSync(10);
        //const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            //password: hash,
        });

        await newUser.save();
        res.status(200).send("Користувач був створений.")

    }catch(err){
        next(err);
    }
}

export const login = async (req, res, next)=>{
    try{
        const user = await User.findOne({name: req.body.name});
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        if(!user.status)return next (createError(404, "Користувача заблоковано"));

        const isPasswordCorrect = req.body.password===crypt(user.password, rand)? true : false;
        console.log("isPasswordCorrect="+isPasswordCorrect);
        if(!isPasswordCorrect){
            return next(createError(400, "Неправильний пароль або ім'я"));
        }
        const token = jwt.sign
        ({  id: user._id, 
            type: user.type}, 
            "Hnvl743Hsfu&49fnHGiagbHFE3Hnvsd7");
        
        const {password, ...otherDetails}= user._doc;
        res.cookie("acces_token", token,{
            httpOnly: true,
        }).status(200)
        .json({details:{...otherDetails}});            
        
    }catch (err){
        next(err);
    }

}
export const passwordUpdate = async(req, res, next)=>{
    try{
        const user = await User.findOne({name: req.body.name});
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        //const salt = bcrypt.genSaltSync(10);
        //const hash = bcrypt.hashSync(req.body.password, salt);
        if(req.body.question1){
            const updatePassw = await User.findByIdAndUpdate(
                user._id,
                {password: req.body.password,
                 question1: req.body.question1,
                 question2: req.body.question2,
                 question3: req.body.question3,
                 question4: req.body.question4,
                 question5: req.body.question5,
                 question6: req.body.question6,
                 question7: req.body.question7,
                 question8: req.body.question8,
                 question9: req.body.question9,
                 question10: req.body.question10,
                 question11: req.body.question11,
                 question12: req.body.question12,
                 question13: req.body.question13,
                 question14: req.body.question14,
                 question15: req.body.question15                 
                }
            )
            res.status(200).json("Користувача було відновлено");

        }else{
            const updatePassw = await User.findByIdAndUpdate(
                user._id,
                {password: req.body.password}
            )
            res.status(200).json("Пароль було відновлено");
        }       
        writeUsers();
    }catch(err){
        next(err);
    }
}

export const passwordCheck = async(req,res,next)=>{
    //


    try{
        const user = await User.findById( req.params.id);
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        
        const isPasswordCorrect = req.query.password===user.password? true : false;
        /*const isPasswordCorrect = await bcrypt.compare(
            req.query.password,
            user.password
        );*/
        if(!isPasswordCorrect){
            return next(createError(400, "Неправильний пароль або ім'я"));
        }else{
            res.status(200).json(user.restriction)
        }

    }catch(err){
        next(err);
    }
}

export const checkRestriction = async(req,res,next)=>{
    try{
        const user = await User.findOne({name: req.query.name});
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        res.status(200).json(user.restriction)
        
    }catch(err){
        next(err);
    }
}
export const doYouHavePassw = async(req,res,next)=>{
    console.log("check="+req.query.check);
    if(req.query.check){
        rand=randNumb();
        console.log("rand="+rand);
        res.status(200).json(rand);
    }else{
    try{
        const user = await User.findOne({name: req.query.name});
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        res.status(200).json(user.password.length);
    }catch(err){
        next(err);
    }
}
}

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite:"none"
    }).status(200).json("Користувач вийшов з акаунта")
    console.log("Ви вийшли з акаунта")
}

