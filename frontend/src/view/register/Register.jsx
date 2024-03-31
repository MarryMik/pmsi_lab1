import {React, useState, useRef} from 'react';
import "./register.scss";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register =()=>{
  const passwordRef = useRef(null);
  const passwCheck = useRef(null);
  const submitRef = useRef(null);
  const errorRef =useRef(null);
    const regex = new RegExp(/^([a-zA-Z]\p{P})+[a-zA-Z]$/, "iu");
    const navigate = useNavigate();
    const [passw, passwCh]=useState({
        passwCheck:"",
    })
    const [inputs, setInputs]=useState({
        name: "",
        password: "",
    })
    const [err, setErr] = useState(null);
    const handleChange = (e) =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const [restrictionUser, setRestriction]=useState(null);
   
    const CheckPassword = (e) =>{
        passwCh({ [e.target.name]: e.target.value });    
    }
    if(passwCheck.current!==null && submitRef.current!==null && errorRef.current!==null && passwordRef.current!==null ){

    if(passw.passwCheck!==inputs.password){
        passwCheck.current.style.borderColor="red";
        passwCheck.current.style.borderWidth="3px";
        passwCheck.current.style.borderStyle="solid";
        submitRef.current.style.pointerEvents = 'none';
        submitRef.current.disabled = true;
        errorRef.current.innerText="Введіть коректний пароль!";
      }else if (passw.passwCheck===inputs.password && passw.passwCheck!==""){
        passwCheck.current.style.borderWidth="0px";
        submitRef.current.style.pointerEvents = 'auto';
        submitRef.current.disabled = false;
        errorRef.current.innerText="";
      }

      if(restrictionUser===true){
        if(regex.test(inputs.password)){
            errorRef.current.innerText="";
            submitRef.current.disabled = false;
        }else{
          submitRef.current.disabled = true;
            errorRef.current.innerText="! Новий пароль має відповідати наступним обмеженням: Чергування букв, знаків пунктуації та знову букв";
        }
      }
  }
    const handleClick = async (e) => {
      e.preventDefault();
      if(restrictionUser!==null){
        if(errorRef.current.innerText===""&& inputs.password===passw.passwCheck ){
          try{
              await axios.put("http://localhost:3300/auth/newpassword",inputs).then(res=>{
                  if(res.data=="Пароль було відновлено"){
                      alert(res.data);
                      navigate("/login");
                  }else{
                      alert("Щось пішло не так!");
                  }
              })
          }catch(err){
              setErr(err.response.data.message)
          }
      }

    }else{
      if(inputs.name.length>0){
        try{
            const res = await axios.get("http://localhost:3300/auth/restriction/", {
                params: {
                  name: inputs.name,
                }}).then((resp)=>{
                  console.log(resp.data);
                  if(resp.data){
                    setRestriction(resp.data);  
                  }else{
                    setRestriction(false);  
                  }
                  console.log(restrictionUser);                 
            });
            
        }catch(err){
            console.log(err);
        }
    }
    }    
  }
      return (
        <div className='registration'>
          <form className='registration__form'>
              <p className='form__text'>Ім'я:</p>
              <input type="text" className='form__input' name="name" placeholder="Введіть ще раз ім'я" onChange={handleChange}/>
            
              <p className='form__text'>Пароль:</p>
              <input type="password" className='form__input' name='password'  placeholder='Введіть новий пароль' ref={passwordRef} onChange={handleChange}/>
            
              <p className='form__text'>Перевірка паролю:</p>
              <input type="password" className='form__input' name='passwCheck'   onChange={CheckPassword} ref={passwCheck} placeholder='Введіть пароль ще раз'/>
            
            <div className='form__bottom'>
              <p className='form__text_error' ref={errorRef}>{err}</p>
              <button className='form__button' ref={submitRef}  onClick={handleClick}>Реєстрація</button>
            </div>
          </form>
    
        </div>
      )
} 
export default Register

