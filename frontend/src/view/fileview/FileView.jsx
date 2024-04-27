import React from "react";
import "./fileview.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
  
const FileView = ()=>{
    return(
        <>
        
        <div className='fileview__file-wrap'>
        <img src={require('../../../src/upload/'+JSON.parse(localStorage.getItem("file")).filename)}  alt="file-picture"/>
           
        </div>
        </>
    )
}

export default FileView;