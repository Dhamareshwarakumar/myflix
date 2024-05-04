import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from './config/axios.js';
import { Provider } from 'react-redux';
import { store } from './config/store';

// Config
axios.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
