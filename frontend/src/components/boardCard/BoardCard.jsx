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
    });
    const [restriction,setRestriction ] = React.useState({
        restriction: !user.restriction,
    });
    const updateMutation = useMutation(
        (upd, data)=>{
            return makeRequest.put("/users/api/"+upd);
        },
        {
            onSuccess: () =>{
                queryClient.invalidateQueries(["users"]);
            },
        }
    );
    
    const handleChange = () =>{
        let answer = window.confirm(`Ви впевнені, що хочете змінити статус користувача ${user.name}?`)
        if(answer){
            updateMutation.mutate(user._id, status);
        }
    };
    const handleRestriction = () =>{
        let answer = window.confirm(`Ви впевнені, що хочете змінити обмеження на пароль користувача ${user.name}?`)
        if(answer){
            updateMutation.mutate(user._id, restriction);
        }
    };

    return(
        <div className="boardcard">
            <div className="boardcard__wrap_name">
                <p className="boardcard__text">Ім'я</p>
                <p className="boardcard__value">{user.name}</p>
            </div>
            <div className="boardcard__wrap_passw">
                <p className="boardcard__text">Пароль</p>
                <p className="boardcard__value">{user.password}</p>
            </div>
            <div className="boardcard__wrap_restriction">
            <p className="boardcard__check-text_status">Обмеження</p>
                <Checkbox
                    value={restrictionCheck}
                    onChange={handleRestriction}
                />
            </div>
            <div className="boardcard__wrap_status">
                <p className="boardcard__check-text_status">Статус</p>
                <Checkbox
                    value={checked}
                    onChange={handleChange}
                />
            </div>
            
        </div>
    )
}
export default BoardCard;