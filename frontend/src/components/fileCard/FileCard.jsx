import React from "react";
import "./filecard.scss";
import {useQuery, useMutation, queryClient} from 'react-query';
import { makeRequest } from "../../axios";
import Checkbox from "../Checkbox/Checkbox";
import fileIcon from "../../style/img/file.svg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const FileCard =({file})=>{
  const navigate = useNavigate();
    const deleteMutationR = useMutation(
        (recId) => {
          return makeRequest.delete("/files/" + recId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["files"]);
          },
        }
      );
      const deleteFile = ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей файл?')
        if (answer){
            deleteMutationR.mutate(file._id);
            window.location.reload(false);
        }
    };
    const openFile =(event)=>{ 
        localStorage.setItem("file",JSON.stringify({
          _id: file._id,
          filename: file.filename,
          time: file.time,
        }) );
        navigate("/fileview");
    }
   
    
    return(<>
    <div className="filecard">
      <button className='filecard__file-img' onClick={openFile} src={fileIcon} ></button>
      <p className="filecard__text">Назва:</p>
      <p className="filecard__text">{file.filename}</p>
      <p className="filecard__text">Розмір:</p>
      <p className="filecard__text">{file.size+" байт"}</p>
      <p className="filecard__text">Дата додання:</p>
      <p className="filecard__text">{file.time}</p>
      <div className="filecard__buttns">
        <button className="filecard__buttn_delete" onClick={deleteFile}>Видалити</button>
        <button className="filecard__buttn_open" onClick={openFile}>Відкрити</button>
        <Link className="filecard__link_downoload" to={process.env.PUBLIC_URL+"/upload/"+file.filename} target="_blank" download> <button className="filecard__buttn_downoload" >Скачати</button></Link>
      </div>
  
    </div>
    </>)
}

export default FileCard;