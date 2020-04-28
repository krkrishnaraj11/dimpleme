import React from 'react';
import './index.css';
import {App} from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../_helpers';

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('app')
);