import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from './config/axios';
import './App.css';

import {
  Home,
  Login
} from './screens';
import {
  ProtectedRoute,
  Alert,
  Logout
} from './components';
import { loginFailed, loginSuccess } from './reducers/authSlice';

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    element: <Logout />
  }
]);

// FIXME: Check JWT expiry
const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error.error)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.setAuthToken(authToken)
      dispatch(loginSuccess(authToken));
    } else {
      dispatch(loginFailed());
    }
  }, []);

  return (
    <>
      {error && (<Alert type={'danger'} msg={error} />)}
      <RouterProvider router={rootRouter} />
    </>
  );
};

export default App;