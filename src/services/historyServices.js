import api from '../axios/axioInstance';

export const getHistory = async () => {
    const response = await api.get('history/getHistory');
    return response.data;
};
export const clearHistory = async () => {
    const response = await api.delete('history/clearHistory');
    return response.data;
};
