import React from "react";
import Login from "./Login";
import HomePage from "./HomePage";
import css from '../css/index.css'
import loginTab from './openWindow';
var $ = require('jquery');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        let data = JSON.parse(this.props.data);
        let logged_in = data.logged_in === "true";

          if (logged_in) {
              let user = JSON.parse(data.user);
              let repos = JSON.parse(data.repos);
              this.state = {
                  logged_in : logged_in,
                  user : user,
                  repos : repos
              };
          } else {
            this.state = {
              logged_in : logged_in,
              user : null,
              repos: null
            }
          }
    }

    /**
     * Renders a Login component. Passes login function
     * @return {Login}
     */
    renderLogin() {
      let props = {
        loginClick : () => this.handleLogIn()
      }
      return <Login {...props} />
    }

    /**
     * Renders the HomePage component.
     * Passes logout function, user and repo data
     * @return {HomePage}
     */
    renderHomePage() {
      let props = {
        logoutClick : () => this.handleLogOut(),
        user : this.state.user,
        repos : this.state.repos
      }
      return <HomePage {...props}/>
    }

    /**
     * Open new window for GitHub OAuth. After user is
     * logged in, window closes and we request user and
     * repo data. Updates the state with new data
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
              this.setState({
                  logged_in : true,
                  user : userData,
                  repos : reposData
              });
            });
        });
    }

    /**
     * Called when user clicks logout.
     */
    handleLogOut() {
        $.get("/logout", (data) => {
        }).then((data) => {
          if (data === "loggedout") {
            this.setState({
              logged_in : false,
              user : null,
              repos: null
            })  ;
          } else {
            console.error("not logged out but should be");
          }

        });
    }

    render () {
        if (!this.state.logged_in) {
          return (
              this.renderLogin()
          );
        } else {
          return (
              this.renderHomePage()
          )
        }
    }
}