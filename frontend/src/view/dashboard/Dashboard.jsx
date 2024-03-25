import React from "react";
import "./dashboard.scss";
import BoardCard from "../../components/boardCard/BoardCard";

const Dashboard =() =>{

    return(
        <div className="dashboard">
            <div className="dasboard__left-menu">
                <button className="left-menu__block-by-name">Заблокувати за іменем</button>
                <button className="left-menu__add-new">Створити користувача</button>
            </div>
            <div className="dashboard__main">
                <div className="block-board">
                    <div className="block-board__search-wrap">
                        <input type="text" className="block-board__name" name="name" onChange={handleChange}/>
                        <button className="block-board__search-button">Пошук</button>
                    </div>
                </div>
                <div className="dashboard__main_wrap">
                    <button className="dashboard__left-button"></button>
                    <div className="dashboard__content"></div>
                    <button className="dashboard__right-button"></button>
                </div>
                <button className="dashboard__more-or-less-button"></button>
            </div>
            
            <div className="create-user">
                <div className="create-user__wrap">
                    <input className="create-user__name-text" name="" placeholder="Введіть ім'я" onChange={handleChange2}/>
                    <button className="create-user__create-button">Створити</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;