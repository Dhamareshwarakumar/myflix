import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed } from '../reducers/authSlice';
// import { setAuthToken } from '../config/axios';
import axios from '../config/axios';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loginFailed());
        localStorage.removeItem('authToken');
        axios.setAuthToken();
        navigate('/login');
    }, []);

    return (
        <div>Logging out...</div>
    );
};

export default Logout;