import React, { useState, useEffect } from 'react';
import SpendingCharts from '../../components/Charts/SpendingChart';
import InfoList from '../../components/InfoList/InfoList';
import { getSpendings } from '../../services/subscriptionServices';
import CustomDropdown from '../../components/Dropdown/Dropdown';
import * as style from '../../components/Charts/SpendingChart.module.css';

const Spendings = () => {
    const [loading, setLoading] = useState(false);
    const [spendings, setSpendings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mode, setMode] = useState('monthly');

    useEffect(() => {
        const handleGetSpendings = async () => {
            setLoading(true);
            try {
                const apiData = await getSpendings();
                setSpendings(apiData.data);
            } catch (error) {
                console.error('Помилка при отриманні списку витрат:', error);
            } finally {
                setLoading(false);
            }
        };
        handleGetSpendings();
    }, []);

    const categories = [...new Set(spendings.map((item) => item.subscriptionId?.category).filter(Boolean))];
    const filteredSpendings = selectedCategory
        ? spendings.filter((item) => item.subscriptionId?.category === selectedCategory)
        : spendings;

    return (
        <div className="content" style={{ flexDirection: 'column', marginBottom: '40px' }}>
            <p>Витрати</p>
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
                <CustomDropdown
                    data={['Усі категорії', ...categories]}
                    placeholder={selectedCategory || 'Усі категорії'}
                    onSelect={(value) => setSelectedCategory(value === 'Усі категорії' ? null : value)}
                />
            </div>
            <div>
                <SpendingCharts spendings={filteredSpendings} selectedCategory={selectedCategory} mode={mode} />
                <InfoList spendings={filteredSpendings} />
            </div>
        </div>
    );
};

export default Spendings;
