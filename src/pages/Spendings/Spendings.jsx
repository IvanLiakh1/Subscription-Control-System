import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
  } from 'recharts';
import Head from '../../components/InfoList/Head/Head';
import * as style from './Spendings.module.css';
import InfoList from '../../components/InfoList/InfoList';
const Spendings = () => {

      
    return (
        <>
            <div className='content' style={{ flexDirection: 'column' }}>
                <p>Витрати</p>
                
                <div className={style.listContent}>
                  <Head/>
                  <InfoList />
                </div>

            </div>  
        </>
    );
};

export default Spendings;