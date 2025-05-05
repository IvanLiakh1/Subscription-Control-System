import React from "react";
import Head from './Head/Head';
import * as style from './InfoList.module.css';
const InfoList = ({data}) => {
    
    return (
        <>
            <div className={style.container}>
                <p>Netflix</p>
                <p>Місячний</p>
                <p>39$</p>
                <p>Дата</p>
            </div>
        </> 
    );
};

export default InfoList;