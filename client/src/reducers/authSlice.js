import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            };
        },
        loginFailed: (state) => {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            };
        }
    }
});

export const { loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;