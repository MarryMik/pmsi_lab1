import {React, useState, useRef} from 'react';
import "./passwordChange.scss"
import axios from 'axios';

const PasswordChange =()=>{
    const oldPassw = useRef(null);
    const passwordRef = useRef(null);
    const passwCheck = useRef(null);

    const submitRef = useRef(null);
    const errorRef =useRef(null);
    return(
        <div className="pass-ch">
            <div className="pass-ch__wrap">
                <div className="passw-ch__old_wrap">
                    <p className="pass-ch__text">Уведіть старий пароль</p>
                    <input className="passw-ch__old-passw" name="password"/>
                    <button className="passw-ch__check-old-passw">Перевірити</button>
                </div>
                <div className="passw-ch__new_wrap">
                    <p className="pass-ch__text">Уведіть новий пароль</p>
                    <input className="passw-ch__new-passw" name="password"/>
                    <p className="pass-ch__text">Уведіть новий пароль ще раз</p>
                    <input className="passw-ch__new-passw_chech" name="password"/>
                    <button className="passw-ch__check-old-passw">Змінити</button>
                </div>
            </div>
        </div>
    )
}
export default PasswordChange;