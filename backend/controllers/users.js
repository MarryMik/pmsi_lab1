import User from "../models/user.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res,next)=>{
    try{

        const user = await User.findById(req.params.id);
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        const updateUser = await User.findByIdAndUpdate(
            user._id,
            {$set: req.body}
        );
        res.status(200).json(updateUser);

    }catch(err){
        next(err);
    }
}


export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200). json("Користувача було видалено");
    }catch(err){
        next(err);
    }
}

export const getUser = async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch (err){
        next(err)
    }
}
export const getUsers = async (req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (err){
        next(err)
    }
}

export const createUser = async (req, res,next)=>{
    try{
        const user = await User.findOne({name: req.body.name});
        if(user) return next(createError(404, 'Користувач з таким іменем вже існує'));
        const newUser = new User({
            name: req.body.name,
            type: "user",
            status: true,
            restriction: true,
            password: ""
        });
        await newUser.save();
        res.status(200).send("Користувач був створений.")
    }catch(err){
        next(err);
    }
}