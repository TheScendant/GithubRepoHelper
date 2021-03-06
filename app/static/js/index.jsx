import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import css from '../css/index.css'
var $ = require('jquery');

//get status from back end and then render App.
$.get("/status", (data) => {
    ReactDOM.render(<App data={ data }/>, document.getElementById("content"));
});

