import React, {Component} from 'react';

import './login.less'
import logo from './images/logo.jpeg'
import { Form, Icon, Input, Button } from 'antd';
import {reqLogin} from "../../api";

const Item = Form.Item; // 不能写在Import之前
/*
    登陆的路由组件
 */
class Login extends Component {

    handleSubmit = e => {
        // 阻止事件的默认行为
        e.preventDefault();
        // 校验所有表单字段
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('发送请求: ', values);
                const {account} = values;
                reqLogin(account).then(response => {
                    console.log('成了', response.data)
                }).catch(error => {
                    console.log('没成', error.data)
                })
            }
        });
    };
    
    render () {

        // 得到具有强大功能的form对象
        const form = this.props.form
        const { getFieldDecorator } = form;

        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>好兄弟你来啦~</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Item>
                                {getFieldDecorator('account', {
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, message: '铁子, 搁这写用户名!' },
                                        { min: 4, message: '最少写4位哦~' },
                                        { max: 12, message: '最多写12位哦~' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名得是洋文,数码和下线条的' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="号子写这"
                                    />,
                                )}
                            </Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    点这
                                </Button>
                            </Form.Item>
                        </Form>
                </section>
            </div>
        )
    }
}
/*
    1. 高阶函数
        1). 一类特别的函数
            a. 接受函数类型的参数
            b. 返回值是函数
        2). 常见高阶函数
            a. 定时器: setTimeout()/setInterval
            b. Promise: Promise(()=>{}) then(value => {}, reason => {})
            c. 数组遍历相关的方法 forEach()/filter()/map()/reduce()/find()/findIndex()
            d. fn.bind()
    2. 高阶组件
        1). 本质就是一个函数
        2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定的属性
        3). 作用: 扩展组件的功能
 */

const WrapLogin = Form.create()(Login)
export default WrapLogin
