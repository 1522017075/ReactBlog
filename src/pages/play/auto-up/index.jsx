import React, {Component} from 'react';
import './index.less'
import {Form, Switch} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqCancelAutoUpdate, reqStartAutoUpdate} from "../../../api";
import storageUtils from "../../../utils/storageUtils";


class autoUp extends Component {

    changeUpdate = () => {
        const user = memoryUtils.user;
        let response;
        if (user.autoUpdate) {
            user.autoUpdate = false
            response = reqCancelAutoUpdate(user);
        } else {
            user.autoUpdate = true
            response = reqStartAutoUpdate(user);
        }
        storageUtils.saveUser(user)
        memoryUtils.user = user
        console.log(response)
    }

    render() {
        const user = memoryUtils.user;

        return (
            <div>
                <div className="auto-update-form">
                    <span>
                        <h3>{user.account}的早上8点自动上报: </h3>
                        <Switch
                            checkedChildren="已开启"
                            unCheckedChildren="已关闭"
                            defaultChecked={user.autoUpdate}
                            onClick={this.changeUpdate}/>
                    </span>
                </div>
            </div>
        )
    }
}


const WrapAutoUp = Form.create()(autoUp)
export default WrapAutoUp