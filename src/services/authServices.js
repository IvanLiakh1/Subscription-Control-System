import api from '../axios/axioInstance';

export const login = async (email, password) => {
    const response = await api.post('user/login-user', { email, password });
    return response.data;
};
export const register = async (nickname, email, password) => {
    const response = await api.post('user/create-user', { nickname, email, password });
    return response.data;
};
