import React from "react";
import css from '../css/index.css'
import * as userActions from '../redux/userActions';
import { STATE_KEY as USER_STATE_KEY } from '../redux/userReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginTab from './openWindow';
var $ = require('jquery');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {greeting: 'Hello ' + this.props.name};

        // This binding is necessary to make `this` work in the callback
        this.getPythonHello = this.getPythonHello.bind(this);
    }

    personaliseGreeting(greeting) {
        this.setState({greeting: greeting + ' ' + this.props.name + '!'});
    }

    getPythonHello() {
        $.get(window.location.href + 'hello', (data) => {
            console.log(data);
            this.personaliseGreeting(data);
        });
    }

    /*handleLogIn(e, {name}) {*/
    handleLogIn() {
        const msg = loginTab("/login");
        msg.then(user => {
            // this.props.userActions.injectUser(user);
            console.warn(user)
        });
    }
    handleLogOut(e, {name}) {
        this.props.userActions.logoutUser();
    }

    helloworld() {
        alert("helloworld");
    }



/*    render () {
        return (
            <Grid>
                <Row>
                <Col md={7} mdOffset={5}>
                    <h1>{this.state.greeting}</h1>
                    <hr/>
                </Col>
                </Row>
                <Row>
                <Col md={7} mdOffset={5}>
                    <Button bsSize="large" bsStyle="danger" onClick={this.getPythonHello}>
                    Say Hello!
                    </Button>
                </Col>
                </Row>
            </Grid>
        );
    }*/
    render () {
        return (
            <div className="wrapper">
            <div className="welcomeTitle">
                <h1> Github Repo Helper </h1>
            </div>
            <div className="loginBox">
                <button className="githubOAuth" onClick={this.handleLogIn.bind(this)}>Login with Github</button>
            </div>
            </div>
        );
    }
}