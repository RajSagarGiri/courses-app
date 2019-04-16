import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom';
import "./bootstrap/dist/css/bootstrap.min.css";
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}><Router><App/></Router></Provider>,
    document.getElementById('root')
);