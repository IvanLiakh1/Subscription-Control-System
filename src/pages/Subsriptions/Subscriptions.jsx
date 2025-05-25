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
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.jsx';
const Subscriptions = () => {
    const [modalWindowIsOpen, setModalWindowOpen] = useState(false);
    const [modalContentType, setModalContentType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
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

    useEffect(() => {
        let result = [...subscriptions];
        if (selectedCategory && selectedCategory !== 'Усі категорії') {
            result = result.filter((sub) => sub.category === selectedCategory);
        }
        if (selectedSort) {
            switch (selectedSort) {
                case 'Дата наступного платежу':
                    result.sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate));
                    break;
                case 'Датою додавання':
                    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case 'Вартість (за зростанням)':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'Вартість (за спаданням)':
                    result.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
        }

        setFilteredSubscriptions(result);
    }, [subscriptions, selectedCategory, selectedSort]);

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
            alert('Помилка перевірки токена:', error);
        } finally {
            setModalWindowOpen(false);
        }
    };

    const categories = [...new Set(subscriptions.map((sub) => sub.category).filter(Boolean))];

    if (status === 'loading') return <LoadingScreen />;
    if (status === 'failed') return <p>Помилка при завантаженні підписок.</p>;

    return (
        <>
            <div className="content" style={{ flexDirection: 'column' }}>
                <p style={{ marginBottom: '8px' }}>Активні підписки</p>
                <div className="content">
                    <div className={style.gridContent}>
                        {(filteredSubscriptions.length > 0 ? filteredSubscriptions : subscriptions).length !== 0 ? (
                            (filteredSubscriptions.length > 0 ? filteredSubscriptions : subscriptions).map(
                                (sub, index) => <Card key={index} sub={sub} />,
                            )
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
                                data={categories}
                                placeholder="Категорія"
                                onSelect={(value) => setSelectedCategory(value)}
                                includeAllOption
                            />
                            <CustomDropdown
                                data={[
                                    'Дата наступного платежу',
                                    'Датою додавання',
                                    'Вартість (за зростанням)',
                                    'Вартість (за спаданням)',
                                ]}
                                placeholder="Сортувати за"
                                onSelect={(value) => setSelectedSort(value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;
