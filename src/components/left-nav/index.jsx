import React, {Component} from 'react';
import './index.less'
import logo from '../../assets/images/logo.jpeg'
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';
import memoryUtils from "../../utils/memoryUtils";

// const {SubMenu} = Menu;
export default class LeftNav extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['1', '2'];

    state = {
        openKeys: ['1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        const user = memoryUtils.user
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>Hello, {user.account}</h1>
                </Link>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{width: 200}}
                >
                    <Menu.Item key="1">
                        <Link to='/auto'>
                            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                            <span>海大每日上报</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/info'>
                            <Icon type="user" />
                            <span>个人小信息</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}