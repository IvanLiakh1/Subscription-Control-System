import api from '../axios/axioInstance';

export const login = async (email, password) => {
    try {
        const response = await api.post('user/login-user', { email, password });
        return response.data;
    } catch (error) {
        throw new error();
    }
};
export const register = async (email, password) => {
    const response = await api.post('user/create-user', { email, password });
    return response.data;
};
export const logOut = async () => {
    const response = await api.post('user/logout-user');
    return response.data;
};
export const editUser = async (notification, futureNotification) => {
    const response = await api.patch('user/editUser', { notification, futureNotification });
    return response.data;
};

export const getUser = async () => {
    const response = await api.get('user/getUser');
    return response.data;
};
export const deleteUser = async () => {
    const response = await api.delete('user/clearUser');
    return response.data;
};
