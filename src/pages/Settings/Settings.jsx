import React, { useEffect } from 'react';
import { Checkbox, message } from 'antd';
import AddSubscriptionTemplate from '../../components/AddSubscription/AddSubscriptionTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setFutureNotification } from '../../services/authSlice';
import { editUser } from '../../services/authServices';

const Settings = () => {
    const dispatch = useDispatch();
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

    return (
        <AddSubscriptionTemplate submitTitle={'Зберегти'} onSubmit={handleUpdate} loading={loading}>
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
            </div>
        </AddSubscriptionTemplate>
    );
};

export default Settings;
