import React from 'react'
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import "antd/dist/antd"
import { store } from './app/Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
