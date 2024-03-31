import {React, useState, useRef} from 'react';
import "./adduser.scss";
import axios from 'axios';

const AddUser =()=>{
    const errorRef =useRef(null);
    const inputName = useRef(null);
    const submitRef = useRef(null);
    const [err, setErr] = useState(null);
    const [newName, setName] = useState(
        {
            name: "",
        }
    );
        if(inputName.current!==null && submitRef.current!==null){
            if(inputName.current.length>0){
                submitRef.current.disabled= false;
            }else{
                submitRef.current.disabled= true;
            }
        }
 const handleClick = async (e) =>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:3300/users/new", newName).then(res=>{
            if(res.data==="Користувач був створений."){
                alert(res.data);
            }else{
                alert("Щось пішло не так!");
            }
        })
    }catch(err){
        setErr(err.response.data.message)
    }
 }
    return(
        <div className='newuser'>
            <form className='newuser__form'>
                <p className='form__text'>Ім'я:</p>
                <input type="text" className='form__input' ref={inputName} name="name" placeholder="Введіть ще раз ім'я" onChange={(e)=>setName(e.target.value)}/>
                <p className='form__text_error' ref={errorRef}>{err}</p>
                <button className='form__button' ref={submitRef}  onClick={handleClick}>Створити користувача</button>
            </form>
        </div>
    )
}
export default AddUser;