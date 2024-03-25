import React from 'react';
import "./header.scss"

import {Link} from "react-router-dom";
const Header=()=>{
    return(
        <div className='nav-bar__wrap'>
            <nav className='nav-bar'>
                <div className='nav-bar__menu'>
                    <button className='nav-bar__detail'>Довідка</button>
                    <button className='nav-bar__info'>Інформація про програму</button> 
                </div>
                <div className='nav-bar__right'></div>
            </nav>
            <div className='info-board'>
                <p className='info-board__text'>Програму виконала 
                ст.гр.122м-23-2 Михайленко Марія Олександрівна
                Варіант №21</p>
            </div>
        </div>
    )
}

export default Header;