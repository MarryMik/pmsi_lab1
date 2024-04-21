import "./logcard.scss"
import React from "react";

const LogCard = ({log})=>{
    return(
        <div className="logcard">
            <p className="boardcard__text">Час</p>
            <p className="boardcard__value">{log.time}</p>
            <p className="boardcard__text">Користувач</p>
            <p className="boardcard__value">{log.username}</p>
            <p className="boardcard__text">Подія</p>
            <p className="boardcard__value">{log.event}</p>
            <p className="boardcard__text">Повідомлення</p>
            <p className="boardcard__value">{log.message}</p>
        </div>
    )
}
export default LogCard;