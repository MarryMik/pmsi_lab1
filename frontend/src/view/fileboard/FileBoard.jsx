import React from "react";
import "./fileboard.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import FileCard from "../../components/fileCard/FileCard";
import { decrypt } from "../../context/demodecrypt.js";

const FileBoard = ()=>{
    const fileRef = useRef(null);
    const [selectedFile, setSelectedFile]=useState(null);
    const [inputs, setInputs]=useState({
        filename: "",
        size:"",
        time:"",
        username: JSON.parse(localStorage.getItem("user")).name,
        userid: JSON.parse(localStorage.getItem("user"))._id
    });
    const handleChange = (e)=>{
        setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
    }
    const uploadFile= async(e)=>{
        //перевірка умови обмежень на розмір файлу
        const isDemo = JSON.parse(localStorage.getItem("user")).isDemo;
        console.log("size of file: "+e.target.files[0].size);
        if(isDemo===true && e.target.files[0].size>100000){
            let key = window.prompt("Ви наразі використуовуєте демоверсію, де розмір файлу не може перевищувати 100кБ. Щоб розблокувати обмеження введіть ключ:");
            //функція для активації ключем
            try{
                const userKey = await makeRequest.get("/users/"+JSON.parse(localStorage.getItem("user"))._id).key;
                console.log("userKey "+userKey);
                if(key===decrypt(userKey, 21)){
                    try{
                        await makeRequest.put("/users/api/"+JSON.parse(localStorage.getItem("user"))._id, {isDemo:false});
                        const retrievedString = localStorage.getItem("user");
                        const parsedObject = JSON.parse(retrievedString);
                        parsedObject.isDemo = false;
                        const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
                        localStorage.setItem("user", modifiedndstrigifiedForStorage);
                    }catch(err){
                        console.log(err);
                    }  
                }else{
                    window.alert("Невірний ключ!");
                    fileRef.current.value=null;

                }
            }catch(err){
                console.log(err)
            }

        }else{
            setSelectedFile(e.target.files[0]);
        }
       

    }

    const upload = async(file)=>{
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/api/upload", formData);
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    const addFile= async(e)=>{
        e.preventDefault();
        let fileURL;       
        if(selectedFile){
            fileURL = await upload(selectedFile);
            setInputs((prev)=>({...prev,
                ["filename"]: fileURL,
                ["size"]: selectedFile.size,
                ["time"]: (new Date()).toString()
                }));
            try{
                const newFile = makeRequest.post("/files/new", inputs);
            }catch(err){
                console.log(err);
            }
            
        }
    }

    const {isLoading: fileLoading, error: fileErr, data: fileData} = useQuery(['files'], ()=>
        makeRequest.get("/files/").then(
            res=>{return res.data}
        )
    );

    return(
        <>
            <div className="fileboard">
                <div className="fileboard__head">
                    <input type="file" className=' file__input_upload'  ref={fileRef} name="file" accept="image/*" onChange={uploadFile}/>
                    <button className="fileboard__newfile" onClick={addFile}>Додати</button>
                </div>
                <div className="fileboard__content">

                </div>
            </div>
        </>
    )
}

export default FileBoard;