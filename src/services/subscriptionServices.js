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
export const getSpendings = async (id) => {
    try {
        const response = await api.get('subscription/getAllSpendings', { params: { subscriptionId: id } });
        return response.data;
    } catch (error) {
        throw new Error('Помилка при отриманні даних');
    }
};
export const editSubscriptions = async (data) => {
    try {
        console.log(data);

        const response = await api.patch('subscription/edit-subscription', data);
        return response.data;
    } catch (error) {
        throw new Error('Помилка при оновленні даних про підписку', error);
    }
};
export const changeStatusSubscription = async (id, status, title) => {
    try {
        const response = await api.patch('subscription/changeStatusSubscription', {
            id: id,
            status: status,
            title: title,
        });
        return response.data;
    } catch (error) {
        throw new Error('Помилка при оновленні даних про підписку', error);
    }
};
export const deleteSubscription = async (id, title) => {
    try {
        const response = await api.delete('subscription/deleteSubscription', { data: { id, title } });
        return response.data;
    } catch (error) {
        throw new Error('Помилка при видаленні даних про підписку', error);
    }
};
export const clearSpendings = async () => {
    try {
        const response = await api.delete('subscription/clearSpendings');
        return response.data;
    } catch (error) {
        throw new Error('Помилка при видаленні історії витрат', error);
    }
};
