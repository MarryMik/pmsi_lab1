import React from "react";
import "./account.scss";
import smile from "../../style/img/smile.png"


const Account =()=>{
    return(
        <div className="account">
            <div className="account__wrap">
                <img  className="account__img" src={smile}/>
                <p className="account__text">Вітаю, Ви увійшли в систему!</p>
            </div>
            
        </div>
    )
}

export default Account;