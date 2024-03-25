import React from "react";
import "./boardCard.scss";

const BoardCard =()=>{
    return(
        <div className="boardcard">
            <div className="boardcard__name_wrap">
                <p className="boardcard__name_text">Ім'я</p>
                <p className="boardcard__name_value">...</p>
            </div>
            <button className="boardcard__block">Заблокувати</button>
            <p className="boardcard__restriction-check-text">Обмеження</p>
            <input type="checkbox" className="boardcard__restriction-check"/>
        </div>
    )
}
export default BoardCard;