import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setErrors } from '../reducers/errorSlice';
import { loginSuccess } from '../reducers/authSlice';
import {
    userLogin,
    userRegister,
    forgotPassword,
    resetPassword
} from '../api/user';
import { Header } from '../components';

const Login = () => {
    const errors = useSelector(state => state.error);
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        otp: '',
        otpHash: ''
    });
    const [formType, setFormType] = useState('LOGIN');      // Allowed Types: LOGIN, SIGNUP, FORGOT_PASS, RESET_PASS

    useEffect(() => {
        document.title = "Netflix | Login";
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    // TODO: clear errors while toggling formtypes
    const toggleFormType = (toggleTo) => {
        formType === 'LOGIN' ? setFormType(toggleTo) : setFormType('LOGIN');
    };

    const handleFormChange = e => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        // Form validations
        if (formType === 'SIGNUP' || formType === 'RESET_PASS') {
            if (formData.password !== formData.confirmPassword) {
                dispatch(setErrors({
                    confirmPassword: "Passwords not matched"
                }));
                return;
            }
        }

        // Send request based on form type
        let resData = null;
        switch (formType) {
            case 'LOGIN':
                resData = await userLogin({ username: formData.username, password: formData.password });
                break;
            case 'SIGNUP':
                resData = await userRegister({ name: formData.name, username: formData.username, password: formData.password });
                break;
            case 'FORGOT_PASS':
                resData = await forgotPassword({ username: formData.username });
                console.log(resData);
                break;
            case 'RESET_PASS':
                resData = await resetPassword({
                    username: formData.username,
                    password: formData.password,
                    otp: formData.otp,
                    otp_hash: formData.otpHash
                });
                break;
            default:
                break;
        }

        // Handle response
        if (resData) {
            switch (formType) {
                case 'LOGIN':
                case 'SIGNUP':
                case 'RESET_PASS':
                    localStorage.setItem('authToken', resData.data.token);
                    dispatch(loginSuccess(resData.data.token));
                    break;
                case 'FORGOT_PASS':
                    setFormData({
                        ...formData,
                        otpHash: resData.otp_hash,
                        username: resData.username
                    });
                    setFormType('RESET_PASS');
                    break;
                default:
                    break;
            }
        }
    };

    return (
        (loading || isAuthenticated) ? 'Loading...' :
            <div className='login-page'>
                <div className="login-page-mask"></div>
                <div className="login-page-main">
                    <Header />
                    <div className="login-form">
                        <h1 className='login-title'>{formType === 'LOGIN' ? 'Sign In' : formType === 'SIGNUP' ? 'Sign Up' : formType === 'FORGOT_PASS' ? 'Forgot Password' : 'Reset Password'}</h1>
                        <form onSubmit={handleFormSubmit}>
                            {formType === 'SIGNUP' && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name && 'is-invalid'}`}
                                        placeholder='Full Name'
                                        value={formData.name}
                                        onChange={handleFormChange}
                                    />
                                    {errors.name && (<p className='invalid-feedback'>{errors.name}</p>)}
                                </div>
                            )}
                            {(formType === 'SIGNUP' || formType === 'LOGIN' || formType === 'FORGOT_PASS' || formType === 'RESET_PASS') && (
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="username"
                                        className={`form-control ${errors.username && 'is-invalid'}`}
                                        placeholder='Email'
                                        value={formData.username}
                                        onChange={handleFormChange}
                                        disabled={formType === 'RESET_PASS' ? true : false}
                                    />
                                    {errors.username && (<p className='invalid-feedback'>{errors.username}</p>)}
                                </div>
                            )}
                            {formType === 'RESET_PASS' && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="otp"
                                        className={`form-control ${errors.otp && 'is-invalid'}`}
                                        placeholder='OTP'
                                        value={formData.otp}
                                        onChange={handleFormChange}
                                    />
                                    {errors.otp && (<p className='invalid-feedback'>{errors.otp}</p>)}
                                </div>
                            )}
                            {(formType === 'SIGNUP' || formType === 'LOGIN' || formType === 'RESET_PASS') && (
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password && 'is-invalid'}`}
                                        placeholder='Password'
                                        value={formData.password}
                                        onChange={handleFormChange}
                                    />
                                    {errors.password && (<p className='invalid-feedback'>{errors.password}</p>)}
                                </div>
                            )}
                            {(formType === 'SIGNUP' || formType === 'RESET_PASS') && (
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                        placeholder='Confirm Password'
                                        value={formData.confirmPassword}
                                        onChange={handleFormChange}
                                    />
                                    {errors.confirmPassword && (<p className='invalid-feedback'>{errors.confirmPassword}</p>)}
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary">
                                {formType === 'LOGIN' ? 'Sign In' : formType === 'SIGNUP' ? 'Sign Up' : formType === 'FORGOT_PASS' ? 'Get OTP' : 'Reset Password'}
                            </button>
                            {(formType === 'LOGIN' || formType === 'SIGNUP') && (
                                <>
                                    <p className='text-white text-center my-3'>OR</p>
                                    <button type="button" className="btn btn-secondary">{formType === 'LOGIN' ? 'Sign in using Google' : 'Sign up using Google'}</button>
                                    {formType === 'LOGIN' && (
                                        <p className="text-white text-center my-3">
                                            <span
                                                className="cursor-pointer hover:text-gray-400 hover:underline"
                                                onClick={() => toggleFormType('FORGOT_PASS')}
                                            >
                                                Forgot Password?
                                            </span>
                                        </p>
                                    )}
                                    <p className='signup-msg'>
                                        {formType === 'LOGIN' ? 'New to Netflix? ' : 'Already having account!? '}{' '}
                                        <span
                                            className='signup-link'
                                            onClick={() => toggleFormType('SIGNUP')}
                                        >
                                            {formType === 'LOGIN' ? 'Sign up now.' : 'Sign In now'}
                                        </span>
                                    </p>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Login;