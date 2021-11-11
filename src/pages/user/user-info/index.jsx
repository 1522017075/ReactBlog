import React, {Component} from 'react';
import memoryUtils from "../../../utils/memoryUtils";

export default class UserInfo extends Component {
    render() {
        const user = memoryUtils.user;
        return (
            <div>
                <h3>公开的信息: 你是{user.account}, 且{user.autoUpdate ? '开启了':'没有开启'}每日自动上报!</h3>
            </div>
        )
    }
}