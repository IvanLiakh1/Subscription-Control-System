import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as style from './SpendingChart.module.css';
import CustomDropdown from '../Dropdown/Dropdown';
import moment from 'moment';
moment.locale('uk');

const groupSpendings = (spendings, mode) => {
    if (spendings.length === 0) return [];

    const grouped = {};
    const dates = spendings.map((s) => moment(s.date));
    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);
    const current = minDate.clone();
    while (current.isSameOrBefore(maxDate, mode === 'weekly' ? 'week' : mode === 'monthly' ? 'month' : 'year')) {
        let key;
        switch (mode) {
            case 'weekly':
                key = `${current.isoWeek()}-${current.year()}`;
                break;
            case 'monthly':
                key = current.format('YYYY-MM');
                break;
            case 'yearly':
                key = current.format('YYYY');
                break;
            default:
                key = current.format('YYYY-MM');
        }
        if (!grouped[key]) grouped[key] = 0;
        if (mode === 'weekly') current.add(1, 'week');
        else if (mode === 'monthly') current.add(1, 'month');
        else if (mode === 'yearly') current.add(1, 'year');
    }
    spendings.forEach((item) => {
        const date = moment(item.date);
        let key;
        switch (mode) {
            case 'weekly':
                key = `${date.isoWeek()}-${date.year()}`;
                break;
            case 'monthly':
                key = date.format('YYYY-MM');
                break;
            case 'yearly':
                key = date.format('YYYY');
                break;
            default:
                key = date.format('YYYY-MM');
        }

        grouped[key] += item.subscriptionId.price;
    });

    return Object.entries(grouped).map(([key, value]) => {
        let label;
        switch (mode) {
            case 'weekly': {
                const [week, year] = key.split('-');
                const startOfWeek = moment().year(year).isoWeek(week).startOf('isoWeek');
                const endOfWeek = moment(startOfWeek).endOf('isoWeek');
                label = `${startOfWeek.format('DD MMM')} – ${endOfWeek.format('DD MMM YYYY')}`;
                break;
            }
            case 'monthly':
                label = moment(key, 'YYYY-MM').format('MMM YYYY');
                break;
            case 'yearly':
                label = key;
                break;
            default:
                label = key;
        }

        return {
            name: label,
            Витрати: value,
        };
    });
};
const padChartData = (data, count = 1) => {
    const emptyItem = { name: '', expenses: 0 };
    const padded = [...Array(count).fill(emptyItem), ...data, ...Array(count).fill(emptyItem)];
    return padded;
};
const SpendingCharts = ({ spendings }) => {
    const [mode, setMode] = useState('monthly');
    const [data, setData] = useState([]);

    useEffect(() => {
        const grouped = groupSpendings(spendings, mode);
        const padded = padChartData(grouped, 1);
        setData(padded);
    }, [spendings, mode]);

    return (
        <>
            <div className={style.container}>
                <div className={style.topRow}>
                    <div className={style.buttonContainer}>
                        <button className={mode === 'weekly' ? style.active : ''} onClick={() => setMode('weekly')}>
                            Тижнями
                        </button>
                        <button className={mode === 'monthly' ? style.active : ''} onClick={() => setMode('monthly')}>
                            Місяцями
                        </button>
                        <button className={mode === 'yearly' ? style.active : ''} onClick={() => setMode('yearly')}>
                            Роками
                        </button>
                    </div>
                    <div>
                        <CustomDropdown />
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: '₴', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `${value} грн`} />
                        <Bar dataKey="Витрати" fill="#82ca9d" label="Витрати" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default SpendingCharts;
