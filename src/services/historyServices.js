import api from '../axios/axioInstance';

export const getHistory = async () => {
    const response = await api.get('history/getHistory');
    return response.data;
};
