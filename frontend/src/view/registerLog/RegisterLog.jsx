import "./registerLog.scss"
import {React, useState, useRef} from 'react';
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import LogCard from "../../components/logCard/logCard";

const RegisterLog = () =>{
    const {isLoading: logsLoading, error: logsError, data: logsData} =useQuery(['Registers'], ()=>
    makeRequest.get("/logs/registerlog/").then(
        res=>{return res.data}
    ));
    return(
        <>
        <p className="log__header">Реєстраційний журнал</p>
        <div className="registerlog">
            {
                 logsError
                 ? "Щось пішло не так!"
                 :logsLoading
                 ?"завантаження"
                 : logsData.map((_log)=><LogCard log={_log} key={_log._id}/>).reverse()
            }
        </div>
        </>
    )
}
export default RegisterLog;