import React, { useState, useEffect } from 'react';
import SpendingCharts from '../../components/Charts/SpendingChart';
import InfoList from '../../components/InfoList/InfoList';
import { getSpendings } from '../../services/subscriptionServices';
const Spendings = () => {
    const [loading, setLoading] = useState(false);
    const [spendings, setSpendings] = useState([]);

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
    return (
        <>
            <div className="content" style={{ flexDirection: 'column' }}>
                <p>Витрати</p>
                <div>
                    <SpendingCharts />
                    <InfoList spendings={spendings} />
                </div>
            </div>
        </>
    );
};

export default Spendings;
