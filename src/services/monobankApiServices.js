import api from '../axios/axioInstance';

export const checkToken = async (token) => {
    try {
        const response = await api.post('user/check-token', { token });
        return response.data;
    } catch (error) {
        console.error('Помилка перевірки токена:', error.message);
        throw error;
    }
};
export const getClientInfo = async (id, token) => {
    try {
        const response = await api.post('user/getClientInfo', { id, token });
        return response.data;
    } catch (error) {
        console.error('Помилка отримання даних:', error.message);
        throw error;
    }
};
