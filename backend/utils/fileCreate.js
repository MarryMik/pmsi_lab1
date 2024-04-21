import fs from "node:fs"
import User from "../models/user.js";
import Reqisters from "../models/reqisters.js";
import Logs from "../models/logs.js";
export async function writeUsers() {
    try{
        const users = await User.find();
        if(users){
            fs.writeFile('../backend/files/users.txt', JSON.stringify(users), err => {
                if (err) {
                  console.error(err);
                } 
              });
        }else{
            console.log("Error!")
        }

    }catch(err){
        console.log(err);
    }
    
}

export async function writeLogs() {
    try{
        const logs = await Logs.find();
        if(logs){
            fs.writeFile('../backend/files/loggingnLog.txt', JSON.stringify(logs), err => {
                if (err) {
                  console.error(err);
                } 
              });
        }else{
            console.log("Error!")
        }

    }catch(err){
        console.log(err);
    }
    
}

export async function writeRegisters() {
    try{
        const regs = await Reqisters.find();
        if(regs){
            fs.writeFile('../backend/files/registrationLog.txt', JSON.stringify(regs), err => {
                if (err) {
                  console.error(err);
                } 
              });
        }else{
            console.log("Error!")
        }

    }catch(err){
        console.log(err);
    }
    
}


