import React, { useEffect } from 'react';
import * as style from './Subsriptions.module.css';
import Card from '../../components/SubscriptionCard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../services/subscriptionSlice.js';
const Subscriptions = () => {
    const dispatch = useDispatch();
    const subscriptions = useSelector((state) => state.subscriptions.items);
    const status = useSelector((state) => state.subscriptions.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubscriptions());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Завантаження...</p>;
    if (status === 'failed') return <p>Помилка при завантаженні підписок.</p>;

    return (
        <div className="content">
            <div className={style.gridContent}>
                {subscriptions.map((sub, index) => (
                    <Card key={index} sub={sub} />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
