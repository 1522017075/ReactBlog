import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from "react-router-dom";
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
            <div>
                <h1>Hello {user.account}</h1>
            </div>
        )
    }
}