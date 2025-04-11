import React, { useEffect } from 'react';
import * as style from './Subsriptions.module.css';
import Card from '../../components/SubscriptionCard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../services/subscriptionSlice.js';
import CustomButton from '../../components/Button/customButton.jsx';
import CustomDropdown from '../../components/Dropdown/Dropdown.jsx';
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
    console.log(subscriptions);

    return (
        <>
            <div className="content" style={{ flexDirection: 'column' }}>
                <p>Активні підписки</p>
                <div className="content">
                    <div className={style.gridContent}>
                        {subscriptions.length !== 0 ? (
                            subscriptions.map((sub, index) => <Card key={index} sub={sub} />)
                        ) : (
                            <p className={style.emptySubscriptions}>Список підписок порожній</p>
                        )}
                    </div>
                    <div className={style.sideBar}>
                        <CustomButton text="Додати дані про підписку" />
                        <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <CustomDropdown
                                data={['Музика', 'Фільми', 'Розваги']}
                                placeholder="Категорія"
                                onSelect={(value) => console.log('Вибрано:', value)}
                            />
                            <CustomDropdown
                                data={['Дата наступного платежу', 'Датою додавання', 'Вартість']}
                                placeholder="По чому сортувати"
                                onSelect={(value) => console.log('Вибрано:', value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;
