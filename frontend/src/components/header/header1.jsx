import React , {useState, useRef} from 'react';
import "./header.scss"
import {Link} from "react-router-dom";
const Header=()=>{
    const infoButt = useRef(null);
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
    return(
        <div className='nav-bar__wrap'>
            <nav className='nav-bar'>
                <div className='nav-bar__menu'>
                    <button className='nav-bar__detail' onClick={menu}>Довідка</button>
                    <button className='nav-bar__info' ref={infoButt} onClick={info}>Інформація про програму</button> 
                </div>
                <div className='nav-bar__right'></div>
            </nav>
        </div>
    )
}

export default Header;