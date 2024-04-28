import React from "react";
import "./filecard.scss";
import {useQuery, useMutation, queryClient} from 'react-query';
import { makeRequest } from "../../axios";
import Checkbox from "../Checkbox/Checkbox";
import fileIcon from "../../style/img/file.svg"
import { Link } from "react-router-dom";
// "../../upload/"


const FileCard =({file})=>{
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
    const printFile=()=>{
        var newWindow = window.open("", "_blank");
        newWindow.document.write("<div>" + `<img src={require('../../upload/'+${file.filename})}  alt="file-picture"/>` + "</div>");
        newWindow.print();
    }
    
    return(<>
    <div className="filecard">
    <button className='filecard__file-img' onClick={openFile} src={fileIcon} ></button>
    <p className="filecard__text">Назва:</p>
    <p className="filecard__text">{file.filename}</p>
    <p className="filecard__text">Розмір:</p>
    <p className="filecard__text">{file.size}</p>
    <p className="filecard__text">Дата додання:</p>
    <p className="filecard__text">{file.time}</p>
    <button className="filecard__buttn_delete" onClick={deleteFile}>Видалити</button>
    <button className="filecard__buttn_open" onClick={openFile}>Відкрити</button>
    <button className="filecard__buttn_print" onClick={printFile}>Друкувати</button>
    <Link to={"/src/upload/"+file.filename} target="_blank" download> <button className="filecard__buttn_downoload" >Скачати</button></Link>
   




    </div>
    </>)
}

export default FileCard;