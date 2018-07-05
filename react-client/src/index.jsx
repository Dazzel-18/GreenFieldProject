import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import './styles/styles.scss';
import AppRouter from './routes/AppRouter.jsx'; 

ReactDOM.render(<AppRouter  />, document.getElementById('app'));