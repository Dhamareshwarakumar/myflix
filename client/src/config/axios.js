import axios from 'axios';
import { store } from './store';
import { clearErrors, setErrors } from '../reducers/errorSlice';

const config = () => {
    axios.defaults.timeout = 1000;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
};

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        // Server responding properly
        let errs = {};
        if (error.response.data.err) {
            Object.keys(error.response.data.err).forEach(errKey => errs[errKey] = error.response.data.err[errKey]);
            store.dispatch(setErrors(errs));
        } else {
            store.dispatch(setErrors({ error: error.response.data.msg }));
            setTimeout(() => store.dispatch(clearErrors()), 5000);
        }
    } else if (error.request) {
        // Server is not responding (maybe 1.timeout, 2.request dropped, 3.response droppped)
        store.dispatch(setErrors({ error: 'Something went wrong, Please try again later!' }));
        setTimeout(() => store.dispatch(clearErrors()), 5000);
        // TODO: when there is a server timeout try exponential backoff method at the api files(handle 1.req processed 2. req not processed)
    } else {
        store.dispatch(setErrors({ error: 'Something went wrong, Please try again later!' }));
        setTimeout(() => store.dispatch(clearErrors()), 5000);
    }
    return Promise.reject(error);
});

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default {
    config,
    setAuthToken
};