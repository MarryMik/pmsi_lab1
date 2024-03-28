import {React, useState, useRef} from 'react';
import "./register.scss";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register =()=>{
  const passwordRef = useRef(null);
  const passwCheck = useRef(null);
  const submitRef = useRef(null);
  const errorRef =useRef(null);
    const regex = new RegExp("");
    const navigate = useNavigate();
    const [passw, passwCh]=useState({
        passwCheck:"",
    })
    const [inputs, setInputs]=useState({
        name: "",
        password: "",
        type:"user",
        status: "active"
    })
    const [err, setErr] = useState(null);
    const handleChange = (e) =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const CheckPassword = (e) =>{
        passwCh({ [e.target.name]: e.target.value });    
    }
    if(passw.passwCheck!==inputs.password){
        passwCheck.current.style.borderColor="red";
        passwCheck.current.style.borderWidth="3px";
        passwCheck.current.style.borderStyle="solid";
        submitRef.current.style.pointerEvents = 'none';
        errorRef.current.innerText="Введіть коректний пароль!";
      }else if (passw.passwCheck===inputs.password && passw.passwCheck!==""){
        passwCheck.current.style.borderWidth="0px";
        submitRef.current.style.pointerEvents = 'auto';
        errorRef.current.innerText="";
      }
    if(inputs.password.match(regex)!==null){
        passwordRef.current.style.borderWidth="0px";
        errorRef.current.innerText="";
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if( inputs.name=="" || inputs.password==""){
          errorRef.current.innerText="Введіть необхідні дані!"
        }else{
          if(!inputs.password.match(regex)){
            errorRef.current.innerText="Пароль не відповідає неохідним вимогам безпеки!";
            passwordRef.current.style.borderColor="red";
            passwordRef.current.style.borderWidth="3px";
            passwordRef.current.style.borderStyle="solid";
          }else{
            errorRef.current.innerText="";
            try {
              await axios.post("http://localhost:3300/auth/register", inputs).then(res=>{
                if(res.data=="Користувач був створений."){
                  navigate("/login");
                }else{
                  alert("Щось пішло не так! Ви не зареєстровані. Спробуйте ще раз.")
                }
              });
            } catch (err) {
              setErr(err.response.data);
            }
        }
        }
      };
      return (
        <div className='registration'>
          <form className='registration__form'>
            <div className='form__field form__name'>
              <p className='form__text'>Ім'я:</p>
              <input type="text" className='form__input' name="name" onChange={handleChange}/>
            </div>                  
            <div className='form__field form__passw'>
              <p className='form__text'>Пароль:</p>
              <input type="password" className='form__input' name='password'  placeholder='Введіть пароль' ref={passwordRef} onChange={handleChange}/>
            </div>
            <div className='form__field form__passw-check'>
              <p className='form__text'>Перевірка паролю:</p>
              <input type="password" className='form__input' name='passwCheck'   onChange={CheckPassword} ref={passwCheck} placeholder='Введіть пароль ще раз'/>
            </div>
            <div className='form__bottom'>
              <p className='form__text_error' ref={errorRef}>{err}</p>
              <button className='form__button' ref={submitRef}  onClick={handleClick}>Реєстрація</button>
            </div>
          </form>
    
        </div>
      )
} 
export default Register

