import React from "react";
import css from '../css/index.css'
var $ = require('jquery');

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderRepo(i,repo) {
        return <span key = {i} >{repo["full_name"]}</span>;
    }

    render () {
        let repos = [];
        let keyNumber = 0;
        for (let repo of this.props.repos) {
            repos.push(this.renderRepo(keyNumber,repo));
            keyNumber++;
        }
        return (
            <div>
                {repos}
            </div>
            )
    }
}
