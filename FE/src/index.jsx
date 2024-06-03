import "antd/dist/antd";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { store } from './app/Redux/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
