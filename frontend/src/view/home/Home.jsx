import React from 'react'
import "./home.scss";
import "../../style/style.scss"
import {Link} from "react-router-dom";
const Home =()=>{
    return(
        <div className='main'>
            <div className='main__choice-wrap'>
                <Link to="/login"><button className='main__login'>Увійти</button></Link>
                <Link to="/register"><button className='main__register' >Зареєструватися</button></Link>
            </div>
        </div>
    )
}

export default Home