import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

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
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: 'white'}}>Content</Content>
                    <Footer style={{textAlign: "center"}}>生活不易, 玥宝叹气</Footer>
                </Layout>
            </Layout>
        )
    }
}