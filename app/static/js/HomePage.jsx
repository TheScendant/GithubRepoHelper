import React from "react";
import css from '../css/index.css'
var $ = require('jquery');

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRepo : null
        }
    }

    /**
     * Sets the current repo forcing rerender of mainPage
     * @param {Event} e - the click event
     */
    changeRepo(e) {
        let index  = e.target.getAttribute("index");
        this.setState({
            activeRepo : index
        })
    }

    /**
     * Returns the repolist for the sidebar. Sets up onclick
     * handler for each item.
     * @param {Number} i - the index of the repo in the list
     * @param {JSON} repo - the repo in for this list element
     * @return {HTMLElement} span to be placed in list
     */
    renderRepoListElement(i,repo) {
        return (
            <span className="repoName" index={i} key = {i} onClick={(e) => this.changeRepo(e)}>
                {repo["name"]}
            </span>
            );
    }

    /**
     * Returns the main page contents to be presented on the main page
     * Prettifies the languages, contributors and tags
     * @return {HTMLElement} main page contents
     */
    getRepoDetails() {
        let repo = this.props.repos[this.state.activeRepo];
        //sort languages by value
        let lans = Object.keys(repo["languages"]).sort(
                    (a,b) => repo["languages"][a] < repo["languages"][b]
                );

        let languages = [];
        lans.forEach((item,index) => {
            languages.push(
                <span className="tableData" key={index}>
                    {item}
                </span>
            );
        });

        let contributors = [];
        repo["contributors"].forEach((item,index) => {
            contributors.push(
                <span className="tableData" key={index}>
                    <img className="avatar" src={item.avatar_url}/>
                    <a href={item.html_url}>{item.login}</a>
                </span>
            );
        });

        let tagList = [];
        repo["tags"].forEach((item,index) => {
            tagList.push (
                <span className="tableData" key={index}>
                    {item.name}
                </span>
                );
        });

        let topics = [];
        repo["topics"]["names"].forEach((item,index) => {
            topics.push(
                <span className="tableData" key={index}>
                {item}
                </span>
            );
        });

        return (
            <div className="repoPage">
                <h2>{repo["name"]}</h2>
                <div className="repoContents">
                    <table className="repoDataTable"><tbody>
                        <tr>
                            <td>Full Name</td>
                            <td><a href={repo["clone_url"]}>{repo["full_name"]}</a></td>
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
                        <tr>
                            <td>Topics</td>
                            <td>{topics}</td>
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
