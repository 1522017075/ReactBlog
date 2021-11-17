import React, {Component} from 'react';
import './index.less'
import { Switch, Table} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqCancelAutoUpdate, reqRecord, reqStartAutoUpdate} from "../../../api";
import storageUtils from "../../../utils/storageUtils";


export default class autoUp extends Component {

    state = {
        dataSource: [],
    }

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
        let result = await reqRecord(user);

        if (result.status === 0){
            const dataSource = result.data
            this.setState({
                dataSource
            })
        } else {
            console.log("历史登陆数据查询错误")
        }
    }

    /*
        初始化Table所有列的数组
     */
    initColumns = () => {
        this.columns = [
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
        ]
    }

    // 为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }

    // 发送Ajax异步请求
    componentDidMount() {
        this.getRecordFromId()
    }


    render() {
        const user = memoryUtils.user;
        const {dataSource} = this.state.dataSource

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
                    <Table dataSource={dataSource} columns={this.columns} />
                </div>
            </div>
        )
    }
}