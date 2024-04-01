import fs from "node:fs"
import User from "../models/user.js";

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


