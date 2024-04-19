//функція появи запитань
import axios from "axios";
import { questions } from "./queshions.js";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function questStart(){
    setInterval(async()=>{
        let num1 = getRandomInt(14);
        let num2 = getRandomInt(14);
        let num3 = getRandomInt(14);

        let question1 = prompt(questions[num1],"");
        let question2 = prompt(questions[num2],"");
        let question3 = prompt(questions[num3],"");

        try{
            const res = await axios.get("http://localhost:3300/users/questions", {
                params: {
                  name: JSON.parse(localStorage.getItem('user')).name,
                  queshions: [question1, question2, question3],
                  numbers: [num1,num2,num3]
                }}).then((resp)=>{
                 console.log(resp.data);
                 if(resp.data.includes(false)) {
                    localStorage.removeItem("user");
                    window.location.reload(false);
                 }
                });
        }catch{
            console.log(err);
        }

    }, 120000)
}