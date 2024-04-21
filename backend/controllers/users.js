import User from "../models/user.js";
import Registers from"../models/reqisters.js";
import Logs from "../models/logs.js"; 
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
        if (req.body.restriction!==undefined){
            let message1 = req.body.restriction===true?"накладено обмеження на пароль":"знято обмеження на пароль";
            const newRegister = new Registers({
                time: (new Date()).toString(),
                username: req.body.name,
                event: "зміна статусу обмеженнь на пароль",
                message: message1
            })
            await newRegister.save();
        }
        if( req.body.status!==undefined){
            let message2 = req.body.status===true?"користувача розблоковано":"користувача заблоковано";
            const newRegister = new Registers({
                time: (new Date()).toString(),
                username: req.body.name,
                event: "зміна статусу доступу користувача",
                message: message2
            })
            await newRegister.save();
        }


        res.status(200).json(updateUser);
         writeUsers();   
    }catch(err){
        next(err);
    }
}


export const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        const newRegister = new Registers({
            time: (new Date()).toString(),
            username: req.body.name,
            event: "видалення користувача",
            message: "успіх"
        })
        await newRegister.save();
        res.status(200). json("Користувача було видалено");
        writeUsers();
        writeRegisters();
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
        const newRegister = new Registers({
            time: (new Date()).toString(),
            username: req.body.name,
            event: "створення користувача",
            message: "успіх"
        })
        await newUser.save();
        await newRegister.save();
        res.status(200).send("Користувач був створений.");
        writeUsers();
        writeRegisters();
    }catch(err){
        next(err);
    }
}
export const checkQueshions = async (req,res,next)=>{
    try{
        const user = await User.findById( req.params.id);
        let queshions = [req.query.question1, req.query.question2,req.query.question3];
        let numbers =[req.query.num1, req.query.num2, req.query.num3];
        if(!user) return next(createError(404, 'Користувач з таким іменем вже існує'));
        if(req.query.question1 && req.query.question2 && req.query.question3 && req.query.num1 && req.query.num2 && req.query.num3){
            
            let answers =[];
            for(let i=0; i<3; i++){
                switch(numbers[i]){
                    case '0': 
                        answers.push(queshions[i]===user.question1);
                        break;
                    case '1': 
                        answers.push(queshions[i]===user.question2);
                        break;
                    case '2': 
                        answers.push(queshions[i]===user.question3);
                        break;
                    case '3': 
                        answers.push(queshions[i]===user.question4);
                        break;
                    case '4': 
                        answers.push(queshions[i]===user.question5);
                        break;
                    case '5': 
                        answers.push(queshions[i]===user.question6);
                        break;
                    case '6': 
                        answers.push(queshions[i]===user.question7);
                        break;
                    case '7': 
                        answers.push(queshions[i]===user.question8);
                        break;
                    case '8': 
                        answers.push(queshions[i]===user.question9);
                        break;
                    case '9': 
                        answers.push(queshions[i]===user.question10);
                        break;
                    case '10': 
                        answers.push(queshions[i]===user.question11);
                        break;
                    case '11': 
                        answers.push(queshions[i]===user.question12);
                        break;
                    case '12': 
                        answers.push(queshions[i]===user.question13);
                        break;
                    case '13': 
                        answers.push(queshions[i]===user.question14);
                        break;
                    case '14': 
                        answers.push(queshions[i]===user.question15);
                        break;
                }
            }
            let message = `відповідь на питання №${numbers[0]} ${answers[0]===true?"правильна":"неправильна"};\n
                            відповідь на питання №${numbers[1]} ${answers[1]===true?"правильна":"неправильна"};\n
                            відповідь на питання №${numbers[2]} ${answers[2]===true?"правильна":"неправильна"};\n  `
            const newLogs = new Logs({
                time: (new Date()).toString(),
                username: req.body.name,
                event: "надання відповідей на питання",
                message: message
            })
            await newLogs.save();
            res.status(200).json({answer1: answers[0],
            answer2:answers[1], answer3:answers[2] });
            writeLogs();
        }else{
            res.status(404).json('Ви не відповіли на питання!');
        }
    }catch{
        next(err);
    }
}