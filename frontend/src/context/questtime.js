//функція появи запитань
import axios from "axios";
import { questions } from "./queshions.js";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
let nIntervId;
export function stopInterval(){
    clearInterval(nIntervId);
}

export function questStart(){
    nIntervId=setInterval(async()=>{
        let num1 =0, num2 =0, num3=0;
        while(num1===num2 || num1===num3 || num2==num3){
            num1 = getRandomInt(14);  
            num2 = getRandomInt(14);  
            num3 = getRandomInt(14);
        }

        let question1 = prompt(questions[num1],"");
        let question2 = prompt(questions[num2],"");
        let question3 = prompt(questions[num3],"");
        try{
            const res = await axios.get("http://localhost:3300/users/questions/"+JSON.parse(localStorage.getItem('user'))._id, {
                params: {
                  name: JSON.parse(localStorage.getItem('user')).name,
                  question1: question1,
                  question2: question2,
                  question3: question3,
                  num1: num1,
                  num2: num2,
                  num3: num3
                }}).then((resp)=>{
                 if(!resp.data.answer1 || !resp.data.answer2 || !resp.data.answer3 || resp.data.answer1===null) {
                    window.alert("Ваші відповіді не співпадають!")
                    localStorage.removeItem("user");
                    window.location.reload(false);
                    stopInterval();
                 }
                });
        }catch(err){
            if(err.response.data==='Ви не відповіли на питання!'){
                window.alert(err.response.data)
                    localStorage.removeItem("user");
                    window.location.reload(false);
                    stopInterval();
            }

        }

    }, 120000)
}