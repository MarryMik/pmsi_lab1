import {React, useState, useRef} from 'react';
import "./passwordChange.scss"
import axios from 'axios';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';

const PasswordChange =()=>{
    
    const oldPassw = useRef(null);
    const passwordRef = useRef(null);
    const passwCheck = useRef(null);

    const submitRef = useRef(null);
    const errorRef =useRef(null);
    const permissionContinue = useRef(null);
    const regx =  new RegExp(/^([a-zA-Z]\p{P})+[a-zA-Z]$/, "iu");

    const [oPass, setInputs] = useState({
        password: "",
    });
    const [passw, passwCh]=useState({
        passwCheck:"",
    })
    const [err, setErr] = useState(null);
    const olpPasswChange = (e)=>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
   
    if(submitRef.current!==null && permissionContinue.current!==null){
        if(permissionContinue.current.innerText!=="Пароль підтверджено!" && errorRef.current.innerText===""){
            submitRef.current.disabled=true;
        }       
    }
    const [restrictionUser, setRestriction]=useState(null);
   const checkOldPassw = async(e)=>{
        e.preventDefault();
        if(oPass.password.length>0){
        try{
            const res = await axios.get("http://localhost:3300/auth/password/"+JSON.parse(localStorage.getItem('user'))._id, {
                params: {
                  password: oPass.password,
                }}).then((resp)=>{
                permissionContinue.current.innerText="Пароль підтверджено!";
                setRestriction(resp.data);            
            });
            
        }catch(err){
            console.log(err);
        }
    }
   }
   const [nPassw, setNewPassw]=useState({
    name: JSON.parse(localStorage.getItem('user')).name,
    password: "",
    });
    const handleChange = (e) =>{
        setNewPassw((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const CheckPassword = (e) =>{
        passwCh({ [e.target.name]: e.target.value });    
    }
    if(passwCheck.current!==null && submitRef.current!==null && errorRef.current!==null && passwordRef.current!==null ){
    if(passw.passwCheck!==nPassw.password){
        passwCheck.current.style.borderColor="red";
        passwCheck.current.style.borderWidth="3px";
        passwCheck.current.style.borderStyle="solid";
        submitRef.current.style.pointerEvents = 'none';
        errorRef.current.innerText="Введіть коректний пароль!";
      }else if (passw.passwCheck===nPassw.password && passw.passwCheck!==""){
        passwCheck.current.style.borderWidth="0px";
        submitRef.current.style.pointerEvents = 'auto';
        submitRef.current.disabled=false;  
        errorRef.current.innerText="";
      }
      if(restrictionUser===true){
        if(regx.test(nPassw.password)){
            errorRef.current.innerText="";
        }else{

            errorRef.current.innerText="! Новий пароль має відповідати наступним обмеженням: Чергування букв, знаків пунктуації та знову букв";
        }
      }
    
}
const ChangePassw = async (e)=>{
    e.preventDefault();
    if(regx.test(nPassw.password)&& nPassw.password===passw.passwCheck ){
        try{
            await axios.put("http://localhost:3300/auth/newpassword",nPassw).then(res=>{
                if(res.data=="Пароль було відновлено"){
                    alert(res.data);
                    window.location.reload();
                }else{
                    alert("Щось пішло не так!");
                }
            })
        }catch(err){
            setErr(err.response.data.message)
        }
    }
}

   
 


    return(
        <div className="pass-ch">
            <div className="pass-ch__wrap">
                <form className="pass-ch__old_wrap">
                    <p className="pass-ch__text">Уведіть старий пароль</p>
                    <input className="pass-ch__old-passw" type="password" name="password" ref={oldPassw} onChange={olpPasswChange}/>
                    <button className="pass-ch__check-old-passw" onClick={checkOldPassw}>Перевірити</button>
                    <p className='form__text_error' ref={errorRef}>{err}</p>
                </form>
                <p className='paasw__continue' ref={permissionContinue}><br/></p>
                 
                <form className="pass-ch__new_wrap">
                    <p className="pass-ch__text">Уведіть новий пароль</p>
                    <input className="pass-ch__new-passw" name="password" type="password"  ref={passwordRef} onChange={handleChange} />
                    <p className="pass-ch__text">Уведіть новий пароль ще раз</p>
                    <input className="pass-ch__new-passw_chech"  type="password" name='passwCheck'   onChange={CheckPassword} ref={passwCheck}/>
                    
                    <button className="pass-ch__check-old-passw" ref={submitRef} onClick={ChangePassw}>Змінити</button>
                    <p className='form__text_error' ref={errorRef}>{err}</p>
                </form>
            </div>
        </div>
    )
}
export default PasswordChange;