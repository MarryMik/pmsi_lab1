import React from 'react'
import "./login.scss";
import { AuthContext } from '../../context/authContext';
import {Link, useNavigate} from "react-router-dom";

const Login = ()=>{
    const [inputs, setInputs]= useState({
        name: "",
        password: "",
    });
    const [err, setErr]= useState (null);
    const navigate = useNamvigate();
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
            <div className='login__field'>
              <p className='login__text'>Логін:</p>
              <input type='text' className='login__input' name='name' onChange={handleChange} placeholder="Введіть ім'я"/>
            </div>
            <div className='login__field'>
              <p className='login__text'>Пароль:</p>
              <input type='password' className='login__input'  name='password' onChange={handleChange} placeholder='Введіть пароль'/>
            </div>
            <div className='login__field_bottom'>
              <p className='login__text_error'>{err}</p>
              <button className='login__buttom' onClick={handleLogin}> Увійти </button>
            </div>
          </form>
        </div>
      </div>
    )
}
export default Login