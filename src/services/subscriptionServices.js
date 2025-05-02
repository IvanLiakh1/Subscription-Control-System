import api from '../axios/axioInstance';

export const getServices = async () => {
    try {
        const response = await api.get('subscription/getService');
        return response.data;
    } catch (error) {
        throw new Error('Помилка при отриманні даних');
    }
};
export const addSubscription = async (data) => {
    try {
        const response = await api.post('subscription/add-subscription', data);
        return response.data;
    } catch (error) {
        throw new Error('Помилка при додаванні підписки');
    }
};
