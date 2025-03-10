import api from '../axios/axioInstance';

export const login = async (email, password) => {
    const response = await api.post('/login-user', { email, password });
    return response.data;
};
export const register = async (nickname, email, password) => {
    const response = await api.post('/create-user', { nickname, email, password });
    return response.data;
};
