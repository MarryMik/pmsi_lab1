import "./registerLog.scss"
import {React, useState, useRef} from 'react';
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import LogCard from "../../components/logCard/logCard";

const RegisterLog = () =>{
    const {isLoading: logsLoading, error: logsError, data: logsData} =useQuery(['Registers'], ()=>
    makeRequest.get("/registerlog/").then(
        res=>{return res.data}
    ));
    return(
        <div className="registerlog">
            {
                 logsError
                 ? "Щось пішло не так!"
                 :logsLoading
                 ?"завантаження"
                 : logsData.map((_log)=><LogCard log={_log} key={_log._id}/>)
            }
        </div>
    )
}
export default RegisterLog;