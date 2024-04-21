import React from "react";
import "./boardCard.scss";
import {useQuery, useMutation, queryClient} from 'react-query';
import { makeRequest } from "../../axios";
import Checkbox from "../Checkbox/Checkbox";
const BoardCard =({user})=>{

    const [checked, setChecked] = React.useState(user.status);
    const [restrictionCheck, setRestrictionCheck] = React.useState(user.restriction);
    const [status, setStatus]= React.useState({
        status: !user.status,
        name: user.name
    });
    const [restriction,setRestriction ] = React.useState({
        restriction: !user.restriction,
        name: user.name
    });
    const updateMutation = (upd, data)=>{
        try{
             makeRequest.put("/users/api/"+upd,data).then(
                res=>{
                    window.location.reload();
                }
             )
        }catch (err){
            console.log(err.response.data.message)
        }
            
        }
    
    
    const handleChange = () =>{
        let answer = window.confirm(`Ви впевнені, що хочете змінити статус користувача ${user.name}?`)
        if(answer){
            updateMutation(user._id, status);
           
        }
    };
    const handleRestriction = () =>{
        let answer = window.confirm(`Ви впевнені, що хочете змінити обмеження на пароль користувача ${user.name}?`)
        if(answer){
            updateMutation(user._id, restriction);
        }
    };

    return(
        <div className="boardcard">
                <p className="boardcard__text">Ім'я</p>
                <p className="boardcard__value">{user.name}</p>
                <p className="boardcard__text">Пароль</p>
                <p className="boardcard__value">{user.password}</p>
            <p className="boardcard__check-text_status">Обмеження</p>
                <Checkbox
                    value={restrictionCheck}
                    onChange={handleRestriction}
                />
                <p className="boardcard__check-text_status">Статус</p>
                <Checkbox
                    value={checked}
                    onChange={handleChange}
                />
            
        </div>
    )
}
export default BoardCard;