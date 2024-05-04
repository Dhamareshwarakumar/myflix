import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import errorReducer from '../reducers/errorSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer
    }
});