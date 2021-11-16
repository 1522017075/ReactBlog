import React, {Component} from 'react';
import './index.less'
import {Form, Switch, Table} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqCancelAutoUpdate, reqRecord, reqStartAutoUpdate} from "../../../api";
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

    getRecordFromId = async () => {
        const user = memoryUtils.user;
        let response = await reqRecord(user);
        return response.data
    }


    render() {
        const user = memoryUtils.user;

        // TODO:值永远在promise对象肚子里？
        let dataSource = [];
        this.getRecordFromId().then(data => {
            console.log(data)
            dataSource = data;
            console.log(dataSource)
        })

        const columns = [
            {
                title: '日期',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '上报结果',
                dataIndex: 'isSuccess',
                key: 'isSuccess',
            },
        ];

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
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        )
    }
}


const WrapAutoUp = Form.create()(autoUp)
export default WrapAutoUp