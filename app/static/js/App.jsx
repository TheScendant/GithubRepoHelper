import React from "react";
import Hello from "./Hello";
import Login from "./Login";
import { PageHeader } from "react-bootstrap";
/*
require('../css/fullstack.css');*/
var $ = require('jquery');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    addHeaderImg() {
    }

    render () {
        return (
            <PageHeader>
                <div className='header-contents'>
                {this.addHeaderImg()}
                {/*<Hello name='Hayden' />*/}
                <Login />
                </div>
            </PageHeader>
        );
    }
}