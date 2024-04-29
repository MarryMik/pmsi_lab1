import React from "react";
import "./fileview.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import ReactToPrint from 'react-to-print';
const FileView = ()=>{
    const componentRef= useRef();
    return(
        <>
        
        <div className='fileview__file-wrap'>
        <img  ref={componentRef} src={require('../../../public/upload/'+JSON.parse(localStorage.getItem("file")).filename)}  alt="file-picture"/>
           <ReactToPrint
           trigger={()=><button className="fileview__buttn_print" >Друкувати</button>}
           content = {()=>componentRef.current}
           />
        </div>
        </>
    )
}

export default FileView;