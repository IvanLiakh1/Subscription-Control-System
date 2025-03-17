import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import subscriptionReducer from './subscriptionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        subscriptions: subscriptionReducer,
    },
});

export default store;
