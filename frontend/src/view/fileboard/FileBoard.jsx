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
    const [search, setSearch]= useState("");    
    const [resultSearch, setReltSearch]=useState([]);
    const [selectedFile, setSelectedFile]=useState(null);
    
    const [checked, setChecked] = React.useState({
        all: true,
        timestart: false,
        timeend: false,
        sizestart: false,
        sizeend: false,
    });
   
    const uploadFile= async(e)=>{
        //перевірка умови обмежень на розмір файлу
        const isDemo = JSON.parse(localStorage.getItem("user")).isDemo;
        console.log("size of file: "+e.target.files[0].size);
        if(isDemo===true && e.target.files[0].size>100000){
            let key = window.prompt("Ви наразі використуовуєте демоверсію, де розмір файлу не може перевищувати 100кБ. Щоб розблокувати обмеження введіть ключ:");
            //функція для активації ключем
            try{
                const userKey = await makeRequest.get("/users/"+JSON.parse(localStorage.getItem("user"))._id);
                if(key===decrypt(userKey.data.key, 21)){
                    try{
                        await makeRequest.put("/users/api/"+JSON.parse(localStorage.getItem("user"))._id, {isDemo:false});
                        const retrievedString = localStorage.getItem("user");
                        const parsedObject = JSON.parse(retrievedString);
                        parsedObject.isDemo = false;
                        const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
                        localStorage.setItem("user", modifiedndstrigifiedForStorage);
                        window.alert("вірний ключ!");
                        setSelectedFile(e.target.files[0]);
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
            try{
                const newFile = makeRequest.post("/files/new", {
                    filename: fileURL,
                    size:selectedFile.size,
                    time:(new Date()).toString(),
                    username: JSON.parse(localStorage.getItem("user")).name,
                    userid: JSON.parse(localStorage.getItem("user"))._id
                });
                fileRef.current.value=null;

            }catch(err){
                console.log(err);
            }
            
        }
    }

    const {isLoading: fileLoading, error: fileErr, data: fileData} = useQuery(['files'], ()=>
        makeRequest.get("/files/"+JSON.parse(localStorage.getItem('user'))._id).then(
            res=>{
                return res.data}
            
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
        setChecked((prev) => ({ ...prev, all: checked.timestart, timestart: !checked.timestart , timeend: false, sizestart: false, sizeend: false }));
    };
    const handleCheckTimeDown = (e) =>{
        setChecked((prev) => ({ ...prev, all: checked.timeend, timestart: false , timeend: !checked.timeend, sizestart: false, sizeend: false }));
    };
    const handleCheckSizeUp = (e) =>{
        setChecked((prev) => ({ ...prev, all: checked.sizestart , timestart: false , timeend: false, sizestart: !checked.sizestart, sizeend: false}));
    };
    const handleCheckSizeDown = (e) =>{
        setChecked((prev) => ({ ...prev, all: checked.sizeend, timestart: false , timeend: false, sizestart: false, sizeend: !checked.sizeend }));
    };
    const handleCheck = (e) =>{
        setChecked((prev) => ({ ...prev, all: true,  timestart: false , timeend: false, sizestart: false, sizeend: false }));
    };
   
    function compareName(a,b){
        return  b.filename-a.filename;
      }
    function compareSizeUp(a,b){
        return a.size - b.size;
      }
      function compareSizeDown(a,b){
        return b.size - a.size;
      }
      
      function compareDateUp(a,b){
        const a1 = new Date(a.time);
        const b1 = new Date(b.time)
        return a1-b1;
      }
      function compareDateDown(a,b){
        const a1 = new Date(a.time);
        const b1 = new Date(b.time)
        return b1-a1;
      }
    return(
        <>
            
            <div className="fileboard">
            <form className="fileboard__search">
                <input type="text"className="fileboard__search_input" value={search} onChange={(e)=>setSearch(e.target.value) } placeholder="Пошук"/>
                <button className="fileboard__search_button" onClick={searchFile}>Знайти</button>
            </form>
            <form className="fileboard__sort">
                <p className="fileboard__text">Сортувати за:</p>
                <Checkbox
                    label="За назвою"
                    value={checked.all}
                    onChange={handleCheck}
                />
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
            
                <div className="fileboard__head">
                    <p className="fileboard__text">Додати новий файл:</p>
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
                        : fileData===null || fileData===undefined
                        ? ""
                        : checked.timestart
                        ? fileData.sort(compareDateDown).map((_file)=><FileCard file={_file} key={_file._id}/>)
                        : checked.timeend
                        ? fileData.sort(compareDateUp).map((_file)=><FileCard file={_file} key={_file._id}/>)
                        : checked.sizestart
                        ? fileData.sort(compareSizeUp).map((_file)=><FileCard file={_file} key={_file._id}/>)
                        : checked.sizeend
                        ? fileData.sort(compareSizeDown).map((_file)=><FileCard file={_file} key={_file._id}/>)
                        : fileData.sort(compareName).map((_file)=><FileCard file={_file} key={_file._id}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default FileBoard;