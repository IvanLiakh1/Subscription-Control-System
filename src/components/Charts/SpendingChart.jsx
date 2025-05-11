import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import * as style from './SpendingChart.module.css';
import { groupSpendingsByCategory } from '../../Utils/groupingData';

const padChartData = (data, count = 1) => {
    if (data.length === 0) return [];
    const emptyItem = { name: '' };
    if (data[0]) {
        Object.keys(data[0]).forEach((key) => {
            if (key !== 'name') emptyItem[key] = 0;
        });
    }
    return [...Array(count).fill(emptyItem), ...data, ...Array(count).fill(emptyItem)];
};

const SpendingCharts = ({ spendings, selectedCategory, mode }) => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const uniqueCategories = [...new Set(spendings.map((item) => item.subscriptionId?.category).filter(Boolean))];
        setCategories(uniqueCategories);

        const grouped = groupSpendingsByCategory(spendings, mode);
        const padded = padChartData(grouped, 1);
        setData(padded);
    }, [spendings, mode]);

    const getColorForCategory = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];
        return colors[index % colors.length];
    };

    return (
        <div className={style.container}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
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
    );
};

export default SpendingCharts;
