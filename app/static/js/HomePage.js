import React from "react";
import css from '../css/index.css'
var $ = require('jquery');

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
            {this.props.user}
            {this.props.repos}
            </div>
        );
    }
}
