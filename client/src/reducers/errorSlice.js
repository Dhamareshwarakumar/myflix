import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrors: (state, action) => action.payload,
        clearErrors: state => initialState
    }
});

export const { setErrors, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;