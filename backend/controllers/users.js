import User from "../models/user.js";
import { createError } from "../utils/error.js";
import { writeUsers,writeLogs,writeRegisters } from "../utils/fileCreate.js";
export const updateUser = async (req, res,next)=>{
    try{

        const user = await User.findById(req.params.id);
        if(!user)return next (createError(404, "Користувача не знайдено!"));
        const updateUser = await User.findByIdAndUpdate(
            user._id,
            {$set: req.body}
        );
        res.status(200).json(updateUser);
         writeUsers();   
    }catch(err){
        next(err);
    }
}


export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200). json("Користувача було видалено");
        writeUsers();
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
        res.status(200).send("Користувач був створений.");
        writeUsers();
    }catch(err){
        next(err);
    }
}
export const checkQueshions = async (req,res,next)=>{
    try{
        const user = await User.findOne({name: req.body.name});
        //const user = await User.findById(req.params.id);
        if(!user) return next(createError(404, 'Користувач з таким іменем вже існує'));
        if(req.body.queshions && req.body.numbers){
            console.log(req.body.queshions)
            console.log(req.body.numbers)
            let answers =[];
            for(let i=0; i<3; i++){
                switch(req.body.numbers[i]){
                    case 0: answers.push(req.body.queshions[i]===user.question1)
                    case 1: answers.push(req.body.queshions[i]===user.question2)
                    case 2: answers.push(req.body.queshions[i]===user.question3)
                    case 3: answers.push(req.body.queshions[i]===user.question4)
                    case 4: answers.push(req.body.queshions[i]===user.question5)
                    case 5: answers.push(req.body.queshions[i]===user.question6)
                    case 6: answers.push(req.body.queshions[i]===user.question7)
                    case 7: answers.push(req.body.queshions[i]===user.question8)
                    case 8: answers.push(req.body.queshions[i]===user.question9)
                    case 9: answers.push(req.body.queshions[i]===user.question10)
                    case 10: answers.push(req.body.queshions[i]===user.question11)
                    case 11: answers.push(req.body.queshions[i]===user.question12)
                    case 12: answers.push(req.body.queshions[i]===user.question13)
                    case 13: answers.push(req.body.queshions[i]===user.question14)
                    case 14: answers.push(req.body.queshions[i]===user.question15)
                }
            }
            console.log("answers: "+answers)
            res.status(200).json(answers);
            
        }else{

        }
    }catch{
        next(err);
    }
}