import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from "./pages/login/login";
import Home from "./pages/home/home";

/*
    应用的根组件
 */

export default class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/home' component={Home}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}