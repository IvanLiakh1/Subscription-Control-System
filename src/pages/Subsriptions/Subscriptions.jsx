import React, { useEffect, useState } from 'react';
import * as style from './Subsriptions.module.css';
import Card from '../../components/SubscriptionCard/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../services/subscriptionSlice.js';
import CustomButton from '../../components/Button/customButton.jsx';
import CustomDropdown from '../../components/Dropdown/Dropdown.jsx';
import ModalWindow from '../../components/ModalWindow/ModalWindow.jsx';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@prismane/core';
import { checkToken } from '../../services/monobankApiServices.js';
import { setMonobankToken } from '../../services/authSlice.js';
const Subscriptions = () => {
    const [modalWindowIsOpen, setModalWindowOpen] = useState(false);
    const [modalContentType, setModalContentType] = useState(null);
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const subscriptions = useSelector((state) => state.subscriptions.items);
    const status = useSelector((state) => state.subscriptions.status);
    const navigate = useNavigate();
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubscriptions());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Завантаження...</p>;
    if (status === 'failed') return <p>Помилка при завантаженні підписок.</p>;

    const handleTokenCheck = async () => {
        try {
            const response = await checkToken(token);
            if (response.isValid) {
                dispatch(setMonobankToken(token));
                navigate('/create-auto');
            } else {
                alert('Недійсний токен. Спробуйте ще раз.');
            }
        } catch (error) {
            console.error('Помилка перевірки токена:', error);
        } finally {
            setModalWindowOpen(false);
        }
    };

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
                        <CustomButton text="Додати дані про підписку" onPress={() => setModalWindowOpen(true)} />
                        {modalWindowIsOpen && (
                            <ModalWindow
                                isOpen={modalWindowIsOpen}
                                onClose={() => {
                                    setModalWindowOpen(false);
                                    setModalContentType(null);
                                }}
                            >
                                {modalContentType === null && (
                                    <div className={style.modalWindowChooseButtonContainer}>
                                        <button
                                            className={style.modalWindowChooseButton}
                                            onClick={() => setModalContentType('auto')}
                                        >
                                            Додати підписку автоматично
                                        </button>
                                        <button
                                            className={style.modalWindowChooseButton}
                                            onClick={(e) => navigate('/create-manual')}
                                        >
                                            Додати підписку власноруч
                                        </button>
                                    </div>
                                )}
                                {modalContentType === 'auto' && (
                                    <div>
                                        <h3>Для автоматичного додавання даних про підписку потрібно:</h3>
                                        <ol style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 5 }}>
                                            <li>
                                                Перейти за посиланням{' '}
                                                <a
                                                    href="https://api.monobank.ua/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Відкрити Monobank API
                                                </a>
                                            </li>
                                            <li>Запустити застосунок Monobank та відсканувати QRCode на сайті</li>
                                            <li>Скопіювати дані з поля &apos;Мій токен&apos;</li>
                                            <li>
                                                Повернутися на цю сторінку та вставити скопійовані дані в текстове поле
                                                нижче
                                            </li>
                                            <li>Натиснути кнопку {'Продовжити'}</li>
                                        </ol>
                                        <div className="modalWindowInputContainer">
                                            <TextField
                                                value={token}
                                                onChange={(e) => setToken(e.target.value)}
                                                placeholder="Токен"
                                                ff="'Inter', sans-serif"
                                                fs="lg"
                                                h={48}
                                            />
                                            <CustomButton
                                                text="Продовжити"
                                                customStyle={{ height: '40px' }}
                                                onPress={(e) => {
                                                    setModalWindowOpen(false);
                                                    handleTokenCheck();
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </ModalWindow>
                        )}
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
