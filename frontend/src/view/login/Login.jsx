import React from 'react'
import "./login.scss";
import {useContext, useState} from 'react'
import { AuthContext } from '../../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { cryptPassw } from '../../context/passwCrypt';
import { questStart } from '../../context/questtime';

const Login = ()=>{
    const [counter, setCounter]=useState(0);
    const [inputs, setInputs]= useState({
        name: "",
        password: "",
    });
    const [inputs2, setInputs2]= useState({
      name:"",
      password: "",
  });
    const [err, setErr]= useState (null);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
        setErr("");
    };
    const {login} = useContext(AuthContext);
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(inputs.password.length===0 && inputs.name!==0){
          await axios.get("http://localhost:3300/auth/password", {
            params:{
              name: inputs.name,
            }
          }).then((res)=>{
            if(res.data===0) navigate("/register")
            else setErr("Введіть пароль.")
          })
        }else{
          try{
            await axios.get("http://localhost:3300/auth/password", {
              params:{
                check: 1,
              }
            }).then(async(res)=>{
              if(res.data){
                let key = cryptPassw(inputs.password,res.data);
                setInputs2({name: inputs.name, password: key});
                await login({name: inputs.name, password: key});
                navigate("/account");
                questStart();
                //setTimeout(questStart(), 2000);                
              }
             
            })

            
          }catch(err){
              setErr(err.response.data.message)
              console.log(err.response.data);
              setCounter(counter+1);

          }
        }
        
    } 
    
    if(counter===3){
      navigate("/");
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