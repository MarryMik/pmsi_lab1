import React from "react";
import "./fileboard.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import FileCard from "../../components/fileCard/FileCard";
import { decrypt } from "../../context/demodecrypt.js";
import {MultiSelect} from "react-multi-select-component";

const FileBoard = ()=>{
    const fileRef = useRef(null);
    const [search, setSearch]= useState("");    
    const [resultSearch, setReltSearch]=useState([]);
    const [selectedFile, setSelectedFile]=useState(null);
    const [inputs, setInputs]=useState({
        filename: "",
        size:"",
        time:"",
        username: JSON.parse(localStorage.getItem("user")).name,
        userid: JSON.parse(localStorage.getItem("user"))._id
    });
    const [checked, setChecked] = React.useState({
        timestart: false,
        timeend: false,
        sizestart: false,
        sizeend: false,
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
    const searchFile = (e) =>{
        e.preventDefault();
        resultSearch.splice(0, resultSearch.length);
        fileData.forEach((el)=>{
            if(el.filename.includes(search)){
                resultSearch.push(el);
            }
        })
    }

   
    const handleCheckTimeUp = (e) =>{
        setChecked((prev) => ({ ...prev, timestart: !checked.timestart , timeend: checked.timestart, sizestart: false, sizeend: false }));
    };
    const handleCheckTimeDown = (e) =>{
        setChecked((prev) => ({ ...prev, timestart: checked.timeend , timeend: !checked.timeend, sizestart: false, sizeend: false }));
    };
    const handleCheckSizeUp = (e) =>{
        setChecked((prev) => ({ ...prev, timestart: false , timeend: false, sizestart: !checked.sizestart, sizeend: checked.sizestart }));
    };
    const handleCheckSizeDown = (e) =>{
        setChecked((prev) => ({ ...prev, timestart: false , timeend: false, sizestart: checked.sizeend, sizeend: !checked.sizeend }));
    };
    const [selected1, setSelected1]=useState([]);
    const [filter, setFilter]= useState(null);   
    //filetypes from  fileData.filename by using refr .png!!!
    const filetypes =[];
    const filterOn = ()=>{
        console.log("selected "+selected1);
       // if(selected1)
    }
    return(
        <>
            
            <div className="fileboard">
            <form className="fileboard__search">
                <input type="text"className="fileboard__search_input" value={search} onChange={(e)=>setSearch(e.target.value) } placeholder="Пошук"/>
                <button className="fileboard__search_button" onClick={searchFile}>Знайти</button>
            </form>
            <form className="dashboard__sort">
                <p className="dashboard__text">Сортувати за:</p>
                <Checkbox
                    label="Спочатку нові"
                    value={checked.timestart}
                    onChange={handleCheckTimeUp}
                />
                 <Checkbox
                    label="Спочатку старі"
                    value={checked.timeend}
                    onChange={handleCheckTimeDown}
                />
                <Checkbox
                    label="Спочатку найменші"
                    value={checked.sizestart}
                    onChange={handleCheckSizeUp}
                />
                <Checkbox
                    label="Спочатку найбільші"
                    value={checked.sizeend}
                    onChange={handleCheckSizeDown}
                />
            </form>
            <form className="fileboard__filter">
                <MultiSelect 
                    className='fileboard__filter_select'
                    options={filetypes}
                    value = {selected1}
                    onChange={setSelected1}
                    labelledBy='Select'
                />
                <button className="fileboard__filter_button" onClick={filterOn}>Застосувати</button>
            </form>
                <div className="fileboard__head">
                    <input type="file" className=' file__input_upload'  ref={fileRef} name="file" accept="image/*" onChange={uploadFile}/>
                    <button className="fileboard__newfile" onClick={addFile}>Додати</button>
                </div>
                <div className="fileboard__content">
                    {
                        fileErr
                        ? "Щось пішло не так!"
                        : fileLoading
                        ? "завантаження"
                        : resultSearch.length>0
                        ? resultSearch.map((_file)=><FileCard file={_file} key={_file._id}/>)
                        : fileData.map((_file)=><FileCard file={_file} key={_file._id}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default FileBoard;