import api from '../axios/axioInstance';

export const getServices = async () => {
    try {
        const response = await api.get('subscription/getService');
        return response.data;
    } catch (error) {
        throw new Error('Помилка при отриманні даних');
    }
};
