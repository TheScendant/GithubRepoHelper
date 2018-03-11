import React from "react";
import css from '../css/index.css'
var $ = require('jquery');

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRepo : null
        }
        // this.changeRepo = this.changeRepo.bind(this);
    }

    changeRepo(e) {
        let index  = e.target.getAttribute("index");
        this.setState({
            activeRepo : index
        })
    }

    renderRepo(i,repo) {
        return <span className="repoName" index={i} key = {i} onClick={(e) => this.changeRepo(e)}> {repo["full_name"]} </span>
    }

    render () {
        let repos = [];
        let keyNumber = 0;
        for (let repo of this.props.repos) {
            repos.push(this.renderRepo(keyNumber,repo));
            keyNumber++;
        }
        return (
            <div className="page">
                <div className="titleBar"><h1>Github Repo Helper</h1></div>
                    <div className="pageContents">
                        <div className="sideBar">
                            {repos}
                            <span className="logOut" onClick={() => this.props.logoutClick()} > Logout</span>
                        </div>
                        <div className="mainPage">
                            {this.state.activeRepo}
                        </div>
                </div>
            </div>
        )
    }
}
