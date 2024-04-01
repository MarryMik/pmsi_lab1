import React from "react";
import "./dashboard.scss";
import BoardCard from "../../components/boardCard/BoardCard";
import Checkbox from "../../components/Checkbox/Checkbox";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRef } from "react";

const Dashboard =() =>{
    const rightButton = useRef(null);
    const leftButton = useRef(null);
    const contentDiv = useRef(null);
    const [search, setSearch]= useState("");
    const [resultSearch, setReltSearch]=useState([]);
    const [checked, setChecked] = React.useState({
        all: true,
        byone: false
    });
    const handleChange = (e) =>{
        setChecked((prev) => ({ ...prev, all: !checked.all , byone: !checked.byone }));
    };
    const {isLoading: usersLoading, error: usersError, data: usersData} =useQuery(['users'], ()=>
    makeRequest.get("/users/").then(
        res=>{return res.data}
    ));
    const [userShow, setUserShow]= useState(0);
    localStorage.setItem("search", JSON.stringify({"":""}));
    const searchUser = (e) =>{
        e.preventDefault();
        setChecked({all: true, byone: false})
        resultSearch.splice(0, resultSearch.length);
        usersData.forEach((el)=>{
            if(el.name.includes(search)){
                resultSearch.push(el);
            }
        })
    }
    const leftClich=(e)=>{
        e.preventDefault();
        if( userShow>0)setUserShow(userShow-1);
        else setUserShow(usersData.length-1);
    }
    const RightClick=(e)=>{
        e.preventDefault();
        if(userShow<usersData.length-1) setUserShow(userShow+1);
        else setUserShow(0);

    }
    if(leftButton.current!==null && rightButton.current!==null && contentDiv.current!==null){
        if(checked.all){
            leftButton.current.style.display = "none";
            rightButton.current.style.display = "none";
            contentDiv.current.style.left = "13%";

        }else{
            leftButton.current.style.display = "block";
            rightButton.current.style.display = "block";
            contentDiv.current.style.left = "8%";
            

        }
    }
    return(
        <div className="dashboard">
            <form className="dashboard__search">
                <input type="text"className="dashboard__search_input" value={search} onChange={(e)=>setSearch(e.target.value) } placeholder="Пошук"/>
                <button className="dashboard__search_button" onClick={searchUser}>Знайти</button>
            </form>
            <div className="dashboard__main">
                <form className="dashboard__filter">
                <Checkbox
                    label="Показати всі"
                    value={checked.all}
                    onChange={handleChange}
                />
                 <Checkbox
                    label="Показати по одному"
                    value={checked.byone}
                    onChange={handleChange}
                />
                </form>
                <div className="dashboard__main_wrap" ref={contentDiv}>
                    <button className="dashboard__left-button" ref ={leftButton} onClick={leftClich}></button>
                    <div className="dashboard__content">
                        {
                            
                            usersError
                            ? "Щось пішло не так!"
                            :usersLoading
                            ?"завантаження"
                            : resultSearch.length>0
                            ? resultSearch.map((_user)=><BoardCard user={_user} key={_user._id}/>)
                            : checked.byone
                            ? usersData.map((_user)=><BoardCard user={_user} key={_user._id}/>).at(userShow)
                            : usersData.map((_user)=><BoardCard user={_user} key={_user._id}/>)
                           
                        }
                    </div>
                    <button className="dashboard__right-button" ref ={rightButton} onClick={RightClick}></button>
                </div>
                <button className="dashboard__more-or-less-button"></button>
            </div>
            
            
        </div>
    )
}


export default Dashboard;