import React , {useState, useRef} from 'react';
import "./header.scss"
import {Link} from "react-router-dom";
const Header3=()=>{
    const infoButt = useRef(null);
    const detailButt = useRef(null);
    const info=async()=>{
        alert("Програму виконала ст.гр.122м-23-2 Михайленко Марія Олександрівна Варіант №21");
    }
    const menu = ()=>{
            if(infoButt.current.style.display==="block"){
                infoButt.current.style.display="none";
            }else{
                infoButt.current.style.display="block";
    
            }
    }
        const [focused, setFocused] = React.useState(false)
        const onFocus = () => setFocused(true)
        const onBlur = () => setFocused(false)
        if(infoButt.current!==null && infoButt.current!=="undefined" ){
            if (focused){
               infoButt.current.style.display="block";
            }else{            
                infoButt.current.style.display="none";
            }
        }

    const logOut =() =>{
        localStorage.removeItem("user");
        window.location.reload(false);
    }
    return(
        <div className='nav-bar__wrap'>
            <nav className='nav-bar'>
                <div className='nav-bar__menu'>
                    <div className='nav-bar__menu_wrap'>
                        <button className='nav-bar__detail' ref={detailButt} onClick={menu}>Довідка</button>
                        <Link to="/passwordChange"><button className='nav-bar__passwordChange'>Змінити пароль</button></Link>
                        <Link to="/account"><button className='nav-bar__account'>Акаунт</button></Link>
                        <Link to="/dachboard"><button className='nav-bar__button'>Користувачі</button></Link>
                        <Link to="/newuser"><button className='nav-bar__button'>Додати користувача</button></Link>
                        
                        <button className='nav-bar__exit' onClick={logOut}>Вийти</button>
                    </div>                    
                    <button className='nav-bar__info' ref={infoButt} onClick={info} onMouseEnter={onFocus} onMouseLeave={onBlur} >Про програму</button> 
                </div>
                <div className='nav-bar__right'></div>
            </nav>
        </div>
    )
}

export default Header3;
