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

    /**
     * Renders a login component. Passes login function
     */
    renderLogin() {
      let props = {
        loginClick : () => this.handleLogIn()
      }
      return <Login {...props}/>
    }

    /**
     * Renders a login component. Passes logout function, user and repo data
     */
    renderHomePage() {
      let props = {
        logoutClick : () => this.handleLogOut(),
        user : this.state.user,
        repos : this.state.repos
      }
      return <HomePage {...props} />
    }

    /**
     * Open new window for GitHub OAuth
     */
    handleLogIn() {
        const msg = loginTab("/login");
        msg.then(data => {
            //get the user and repos data and update the state
            let user = $.get("/user", (data) => {
              return data;
            });
            let repos = $.get("/repos", (data) => {
              return data;
            })
            $.when(user,repos).done((user,repos) => {
              let userData = JSON.parse(user[0]);
              let reposData = JSON.parse(repos[0]);
              this.setState( {
                  logged_in : "true",
                  user : userData,
                  repos : reposData
              })
            })
        });
    }

    //todo
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