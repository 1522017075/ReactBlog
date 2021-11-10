import React, {Component} from 'react';
import './index.less'
import logo from '../../assets/images/logo.jpeg'

export default class Index extends Component {
    render() {
        return (
            <div className="left-nav">
                <header className={"left-nav-header"}>
                    <img src={logo} alt="logo"/>
                    <h1>Hello hxd</h1>
                </header>
            </div>
        )
    }
}