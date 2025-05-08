import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as style from './SpendingChart.module.css';
import CustomDropdown from '../Dropdown/Dropdown';
const SpendingCharts = ({ spendings }) => {
    return (
        <>
            <div className={style.container}>
                <div className={style.topRow}>
                    <div className={style.buttonContainer}>
                        <button>Тижнями</button>
                        <button>Місяцями</button>
                        <button>Роками</button>
                    </div>
                    <div>
                        <CustomDropdown />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpendingCharts;
