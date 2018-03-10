import React from "react";
import css from '../css/index.css'
var $ = require('jquery');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="wrapper">
                <div className="welcomeTitle">
                    <h1> Github Repo Helper </h1>
                </div>
                <div className="loginBox">
                    <button className="githubOAuth" onClick={() => this.props.loginClick()}>Login with Github</button>
                </div>
            </div>

        );
    }
}
