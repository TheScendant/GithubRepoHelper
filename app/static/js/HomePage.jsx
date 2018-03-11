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

    renderRepoListElement(i,repo) {
        return <span className="repoName" index={i} key = {i} onClick={(e) => this.changeRepo(e)}> {repo["name"]} </span>
    }

    getRepoDetails() {
        let activeRepo = this.props.repos[this.state.activeRepo];
        let lans = activeRepo["languages"];
        lans = Object.keys(lans).sort((a,b) => lans[a] < lans[b]);
        let languages = "";
        lans.forEach((item,index) => {
            languages += item;
            if (index !== lans.length-1) {
                languages +=", ";
            }
        });
        return (
            <div className="repoPage">
                <h2>{activeRepo["name"]}</h2>
                <a href={activeRepo["clone_url"]}>View Repo</a>
                <div className="repoContents">
                    <table className="repoDataTable"><tbody>
                        <tr>
                            <td>Full Name</td>
                            <td>{activeRepo["full_name"]}</td>
                        </tr>
                        <tr>
                            <td>Last Updated</td>
                            <td>{activeRepo["updated_at"]}</td>
                        </tr>
                        <tr>
                            <td>Langauges</td>
                            <td>{languages}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
            );
    }

    render () {
        let repos = [];
        let keyNumber = 0;
        for (let repo of this.props.repos) {
            repos.push(this.renderRepoListElement(keyNumber,repo));
            keyNumber++;
        }
        let activeRepo;
        if (this.state.activeRepo) {
            activeRepo = this.getRepoDetails();
        }
        return (
            <div className="page">
                <div className="titleBar">
                    <span><h1>Github Repo Helper</h1></span>
                </div>
                    <div className="pageContents">
                        <div className="sideBar">
                            <div className="repoList">
                                <span><h3>Repositories</h3></span>
                                {repos}
                            </div>
                            <span className="logOut" onClick={() => this.props.logoutClick()} >Logout</span>
                        </div>
                        <div className="mainPage">
                            {activeRepo}
                        </div>
                </div>
            </div>
        )
    }
}
