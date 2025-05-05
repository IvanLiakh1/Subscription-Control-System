import React from "react";
import * as style from './Head.module.css';
const Head = () => {
    
    return (
        <>
            <div className={style.container}>
                <p>Сервіс</p>
                <p>Тип платежу</p>
                <p>Вартість</p>
                <p>Дата</p>
            </div>
            <hr/>
        </> 
    );
};

export default Head;