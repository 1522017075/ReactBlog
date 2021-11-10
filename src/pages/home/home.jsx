import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

import AutoUp from "../play/auto-up";
import UserInfo from "../user/user-info";

const { Footer, Sider, Content } = Layout;
/*
    管理员的路由组件
 */
export default class Home extends Component {
    
    render () {
        const user = memoryUtils.user;
        // 如果内存中没有存在user
        if (!user || !user.id) {
            // 自动跳转到登陆
            return <Redirect to='/login'/>
        }
        return(
            // #ffb6b9 #fae3d9 #bbded6 #8ac6d1
            <BrowserRouter>
                <Layout style={{height: '100%'}}>
                    <Sider style={{backgroundColor: "#fae3d9"}}>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{backgroundColor: 'white'}}>
                            <Switch>
                                <Route path='/auto' component={AutoUp}/>
                                <Route path='/info' component={UserInfo}/>
                                <Redirect to={'/auto'}/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: "center"}}>生活不易, 玥宝叹气</Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}