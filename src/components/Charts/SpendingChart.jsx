import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import * as style from './SpendingChart.module.css';
import CustomDropdown from '../Dropdown/Dropdown';
import moment from 'moment';
moment.locale('uk');

const groupSpendingsByCategory = (spendings, mode, selectedCategory) => {
    if (spendings.length === 0) return [];

    const filteredSpendings = selectedCategory
        ? spendings.filter((item) => item.subscriptionId?.category === selectedCategory)
        : spendings;

    const categories = selectedCategory
        ? [selectedCategory]
        : [...new Set(spendings.map((item) => item.subscriptionId?.category).filter(Boolean))];

    const dates = filteredSpendings.map((s) => moment(s.date));
    if (dates.length === 0) return [];

    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);
    const current = minDate.clone();

    const grouped = {};
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

        if (!grouped[key]) {
            grouped[key] = { name: key };
            categories.forEach((category) => {
                grouped[key][category] = 0;
            });
        }

        if (mode === 'weekly') current.add(1, 'week');
        else if (mode === 'monthly') current.add(1, 'month');
        else if (mode === 'yearly') current.add(1, 'year');
    }

    filteredSpendings.forEach((item) => {
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

        const category = item.subscriptionId?.category || 'Інше';
        if (grouped[key]) {
            grouped[key][category] = (grouped[key][category] || 0) + item.subscriptionId.price;
        }
    });
    const result = Object.values(grouped).map((item) => {
        let label;
        const key = item.name;

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
            ...item,
            name: label,
        };
    });

    return result;
};

const padChartData = (data, count = 1) => {
    if (data.length === 0) return [];

    const emptyItem = { name: '' };
    if (data[0]) {
        Object.keys(data[0]).forEach((key) => {
            if (key !== 'name') emptyItem[key] = 0;
        });
    }

    const padded = [...Array(count).fill(emptyItem), ...data, ...Array(count).fill(emptyItem)];
    return padded;
};

const SpendingCharts = ({ spendings }) => {
    const [mode, setMode] = useState('monthly');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const uniqueCategories = [...new Set(spendings.map((item) => item.subscriptionId?.category).filter(Boolean))];
        setCategories(uniqueCategories);

        const grouped = groupSpendingsByCategory(spendings, mode, selectedCategory);
        const padded = padChartData(grouped, 1);
        setData(padded);
    }, [spendings, mode, selectedCategory]);

    const getColorForCategory = (index) => {
        const colors = [
            '#8884d8',
            '#82ca9d',
            '#ffc658',
            '#ff8042',
            '#0088FE',
            '#00C49F',
            '#FFBB28',
            '#FF8042',
            '#A4DE6C',
            '#D0ED57',
        ];
        return colors[index % colors.length];
    };

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
                        <CustomDropdown
                            data={categories}
                            placeholder={selectedCategory || 'Усі категорії'}
                            onSelect={(value) => setSelectedCategory(value === 'Усі категорії' ? null : value)}
                            includeAllOption
                        />
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-0} textAnchor="middle" height={20} />
                        <YAxis label={{ value: '₴', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value} грн`, '']} />
                        <Legend />
                        {selectedCategory ? (
                            <Bar dataKey={selectedCategory} fill={getColorForCategory(0)} name={selectedCategory} />
                        ) : (
                            categories.map((category, index) => (
                                <Bar
                                    key={category}
                                    dataKey={category}
                                    stackId="a"
                                    fill={getColorForCategory(index)}
                                    name={category}
                                />
                            ))
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default SpendingCharts;
