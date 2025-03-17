import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubscriptions = createAsyncThunk('subscriptions/fetchSubscriptions', async () => {
    const response = await axios.get('http://localhost:7000/api/subscription/getAllSubscriptions', {
        withCredentials: true,
    });
    return response.data;
});
const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.error('Помилка при отриманні підписок:', action.error);
            });
    },
});

export default subscriptionSlice.reducer;
