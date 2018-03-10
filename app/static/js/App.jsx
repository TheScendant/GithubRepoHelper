import React from "react";
import Login from "./Login";
import HomePage from "./HomePage";
import css from '../css/index.css'
import loginTab from './openWindow';
var $ = require('jquery');

export default class App extends React.Component {

    constructor(props) {
        super(props);

        //todo = actually get state from flask
        this.state = {
          logged_in : "false",
          user : null,
          repos: null
        }
    }

    renderLogin() {
      let props = {
        loginClick : () => this.handleLogIn()
      }
      return <Login {...props}/>
    }

    renderHomePage() {
      let props = {
        logoutClick : () => this.handleLogOut(),
        user : this.state.user,
        repos : this.state.repos
      }
      return <HomePage {...props} />
    }

    handleLogIn() {
        const msg = loginTab("/login");
        msg.then(data => {
            this.setState( {
                logged_in : "true",
                user : data["user"],
                repos : data["repos"]
            })
        });
    }

    handleLogOut(e, {name}) {
        $.get("/logout", (data) => {
            console.warn(data);
        } )
    }
    render () {
        if (this.state.logged_in === "false") {
          return (
              <div>
                 {this.renderLogin()}
              </div>
          );
        } else {
          return (
            <div>
              {this.renderHomePage()}
            </div>
          )
        }
    }
}