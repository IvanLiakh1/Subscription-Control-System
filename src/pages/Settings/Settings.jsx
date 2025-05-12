import React, { useEffect } from 'react';
import { Checkbox, message } from 'antd';
import AddSubscriptionTemplate from '../../components/AddSubscription/AddSubscriptionTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setFutureNotification, logoutUser } from '../../services/authSlice';
import { editUser, deleteUser, logOut } from '../../services/authServices';
import { Popconfirm, Button } from 'antd';
import { Pause, Trash2, CirclePlay, LogOut, UserRoundMinus } from 'lucide-react';
import { clearSpendings } from '../../services/subscriptionServices';
import { clearHistory } from '../../services/historyServices';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notificationSetting = useSelector((state) => state.auth.notification);
    const futureNotificationSetting = useSelector((state) => state.auth.futureNotification);

    const [loading, setLoading] = React.useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await editUser({
                notification: notificationSetting,
                futureNotification: futureNotificationSetting,
            });
            dispatch(setNotification(notificationSetting));
            dispatch(setFutureNotification(futureNotificationSetting));
            message.success('Налаштування успішно збережено');
        } catch (error) {
            console.error('Помилка оновлення налаштувань:', error);
            message.error('Не вдалося зберегти налаштування');
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        try {
            await clearHistory();
            message.success('Історію дій очищено');
        } catch (error) {
            console.error('Помилка очищення історії:', error);
            message.error('Не вдалося очистити історію');
        }
    };

    const handleClearSpendings = async () => {
        try {
            await clearSpendings();
            message.success('Історію витрат очищено');
        } catch (error) {
            console.error('Помилка очищення витрат:', error);
            message.error('Не вдалося очистити витрати');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser();
            message.success('Обліковий запис видалено');
            dispatch(logoutUser());
            navigate('/login');
        } catch (error) {
            console.error('Помилка видалення акаунта:', error);
            message.error('Не вдалося видалити акаунт');
        }
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <AddSubscriptionTemplate submitTitle={'Готово'} onSubmit={handleUpdate} loading={loading}>
            <h2>Налаштування</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Checkbox
                    checked={futureNotificationSetting}
                    onChange={(e) => dispatch(setFutureNotification(e.target.checked))}
                >
                    Сповіщення на пошту про майбутнє списання
                </Checkbox>
                <Checkbox checked={notificationSetting} onChange={(e) => dispatch(setNotification(e.target.checked))}>
                    Сповіщення на пошту про списання
                </Checkbox>
                <Popconfirm title="Очистити історію дій" okText="Так" cancelText="Ні" onConfirm={handleClearHistory}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Button type="default" danger icon={<Trash2 />} />
                        <p>Очистити історію дій</p>
                    </div>
                </Popconfirm>
                <Popconfirm
                    title="Очистити історію витрат"
                    okText="Так"
                    cancelText="Ні"
                    onConfirm={handleClearSpendings}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Button type="default" danger icon={<Trash2 />} />
                        <p>Очистити історію витрат</p>
                    </div>
                </Popconfirm>
                <Popconfirm title="Видалити аккаунт" okText="Так" cancelText="Ні" onConfirm={handleDeleteAccount}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Button type="default" danger icon={<UserRoundMinus />} />
                        <p>Видалити аккаунт</p>
                    </div>
                </Popconfirm>
                <Popconfirm title="Вийти з аккаунта" okText="Так" cancelText="Ні" onConfirm={handleLogOut}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Button type="default" icon={<LogOut />} />
                        <p>Вийти з аккаунта</p>
                    </div>
                </Popconfirm>
            </div>
        </AddSubscriptionTemplate>
    );
};

export default Settings;
