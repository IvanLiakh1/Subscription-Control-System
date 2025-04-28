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
