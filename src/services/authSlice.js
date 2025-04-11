import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:7000/api/user/check-session', {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Server error');
    }
});

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    initialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setAuthData: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                console.log('checkSession fulfilled:', action.payload);
                state.loading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user || null;
                state.initialized = true;
            })
            .addCase(checkSession.rejected, (state, action) => {
                console.error('checkSession rejected:', action.payload);
                state.loading = false;
                state.isAuthenticated = false;
                state.initialized = true;
            });
    },
});

export const { logout, setAuthData } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthInitialized = (state) => state.auth.initialized;
