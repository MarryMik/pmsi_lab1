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
            //isAdmin: false,
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
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect){
            return next(createError(400, "Неправильний пароль або ім'я"));
        }
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.JWT
        );
        const {password, isAdmin, ...otherDetails}= user._doc;
        res.cookie("acces_token", token,{
            httpOnly: true,
        }).status(200)
        .json({details:{...otherDetails}, isAdmin});            
        
    }catch (err){
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