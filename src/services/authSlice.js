import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:7000/api/user/check-session', {
            withCredentials: true,
        });

        if (response.data.isAuthenticated) {
            const userResponse = await axios.get('http://localhost:7000/api/user/getUser', {
                withCredentials: true,
            });
            return {
                ...response.data,
                user: userResponse.data.user,
                notification: userResponse.data.user?.notification || false,
                futureNotification: userResponse.data.user?.futureNotification || false,
            };
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Server error');
    }
});
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch, rejectWithValue }) => {
    try {
        await axios.post('http://localhost:7000/api/user/logout-user', {}, { withCredentials: true });
        dispatch(logout());
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Logout error');
    }
});

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
    monobankToken: null,
    notification: false,
    futureNotification: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.monobankToken = null;
            state.notification = false;
            state.futureNotification = false;
        },
        setAuthData: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.initialized = true;
        },
        setMonobankToken: (state, action) => {
            state.monobankToken = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setFutureNotification: (state, action) => {
            state.futureNotification = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user || null;
                state.notification = action.payload.notification;
                state.futureNotification = action.payload.futureNotification;
                state.initialized = true;
            })
            .addCase(checkSession.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.initialized = true;
                state.error = action.payload;
            });
    },
});

export const { logout, setAuthData, setMonobankToken, setFutureNotification, setNotification } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthInitialized = (state) => state.auth.initialized;
export const selectNotificationSettings = (state) => ({
    notification: state.auth.notification,
    futureNotification: state.auth.futureNotification,
});
