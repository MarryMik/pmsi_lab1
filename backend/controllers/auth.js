import User from "../models/user.js"; 
import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"
import bcrypt from "bcryptjs";

export const register = async (req,res, next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            //type: "admin",
            //status:"active",
            password: hash,
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
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
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
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const updatePassw = await User.findByIdAndUpdate(
            user._id,
            {password: hash}
        )
        res.status(200).json("Пароль було відновлено");
    }catch(err){
        next(err);
    }
}

export const passwordCheck = async(req,res,next)=>{
    try{
        const user = await User.findById( req.params.id);
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        const isPasswordCorrect = await bcrypt.compare(
            req.query.password,
            user.password
        );
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
    try{
        const user = await User.findOne({name: req.query.name});
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        res.status(200).json(user.password.length);
    }catch(err){
        next(err);
    }
}

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite:"none"
    }).status(200).json("Користувач вийшов з акаунта")
    console.log("Ви вийшли з акаунта")
}

