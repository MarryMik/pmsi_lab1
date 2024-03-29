import React from 'react'
import "./login.scss";
import {useContext, useState} from 'react'
import { AuthContext } from '../../context/authContext';
import {Link, useNavigate} from "react-router-dom";

const Login = ()=>{
    const [inputs, setInputs]= useState({
        name: "",
        password: "",
    });
    const [err, setErr]= useState (null);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
    };
    const {login} = useContext(AuthContext);
    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            await login(inputs);
            navigate("/account")
        }catch(err){
            console.log(err);
        }
    } 

    return(
        <div className='login'>
        <div className='login__box'>
          <form className='login__form'>
            
              <p className='login__text'>Логін:</p>
              <input type='text' className='login__input' name='name' onChange={handleChange} placeholder="Введіть ім'я"/>
            
              <p className='login__text'>Пароль:</p>
              <input type='password' className='login__input'  name='password' onChange={handleChange} placeholder='Введіть пароль'/>
            
            <div className='login__field_bottom'>
              <p className='login__text_error'>{err}</p>
              <button className='login__button' onClick={handleLogin}> Увійти </button>
            </div>
          </form>
        </div>
      </div>
    )
}
export default Login