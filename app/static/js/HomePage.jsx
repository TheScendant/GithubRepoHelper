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
        return (
            <span className="repoName" index={i} key = {i} onClick={(e) => this.changeRepo(e)}>
                {repo["name"]}
            </span>
            );
    }

    getRepoDetails() {
        let repo = this.props.repos[this.state.activeRepo];
        let lans = Object.keys(repo["languages"]).sort(
                    (a,b) => repo["languages"][a] < repo["languages"][b]
                );
        let languages = "";
        lans.forEach((item,index) => {
            languages += item;
            if (index !== lans.length-1) {
                languages +=", ";
            }
        });

        let contributors = "";
        let cons = repo["contributors"].map( (x) => x.login);
        cons.forEach((item,index) => {
            contributors+=item;
            if (index !==cons.length-1) {
                contributors+=", ";
            }
        })

        let tagList = "";
        let tags = repo["tags"];
        tags.forEach((item,index) => {
            tagList += item.name;
            if (index !== tags.length-1) {
                tagList += ", ";
            }
        });

        return (
            <div className="repoPage">
                <h2>{repo["name"]}</h2>
                <a href={repo["clone_url"]}>View Repo</a>
                <div className="repoContents">
                    <table className="repoDataTable"><tbody>
                        <tr>
                            <td>Full Name</td>
                            <td>{repo["full_name"]}</td>
                        </tr>
                        <tr>
                            <td>Last Updated</td>
                            <td>{repo["updated_at"]}</td>
                        </tr>
                        <tr>
                            <td>Langauges</td>
                            <td>{languages}</td>
                        </tr>
                        <tr>
                            <td>Contributors</td>
                            <td>{contributors}</td>
                        </tr>
                        <tr>
                            <td>Tags</td>
                            <td>{tagList}</td>
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
                                <span><h2>Repositories</h2></span>
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
