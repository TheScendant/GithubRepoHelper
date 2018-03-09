import React from "react";
import Hello from "./Hello";
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
                <Hello name='Hayden' />
                </div>
            </PageHeader>
        );
    }
}