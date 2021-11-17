import React, {Component} from 'react';
import './index.less'
import {Button, message, Switch, Table, Tag, Modal} from "antd";
import memoryUtils from "../../../utils/memoryUtils";
import {reqCancelAutoUpdate, reqRecord, reqStartAutoUpdate, reqUpdateBySelf} from "../../../api";
import storageUtils from "../../../utils/storageUtils";
const { confirm } = Modal;

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
        const result = await reqRecord(user);

        if (result.status) {
            let dataSource = result.data
            dataSource.sort((a, b) => b.updateTime - a.updateTime)
            dataSource.forEach(user => {
                let timestamp4 = new Date(user.updateTime)
                user.updateTime = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
                user.isSuccess = user.isSuccess ? "成功" : "失败"
            })
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
                render: isSuccess => (
                    <Tag color={isSuccess === "成功" ? "geekblue" : "red"} key="isSuccess">
                        {isSuccess}
                    </Tag>
                )
            },
        ]
    }

    // 为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }

    updateByOneSelf = async () => {
        console.log("上报啦")
        const user = memoryUtils.user;
        const result = await reqUpdateBySelf(user);
        if (result.status) {
            this.getRecordFromId().then()
            message.info("上报成功!")
        } else {
            message.error("上报失败，请联系子扬!")
        }
    }

    showConfirm = () => {
        confirm({
            title: '确定要手动上报一次嘛??',
            content: '这样做的后果就是, 会手动上报一次',
            okText: '冲他',
            cancelText: '我缓缓再来',
            onOk :() => {
                this.updateByOneSelf().then()
            },
            onCancel() {
                console.log('我缓缓再来');
            },
        });
    }

    // 发送Ajax异步请求
    componentDidMount() {
        this.getRecordFromId().then()
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
                    <br/>
                    <div className="auto-update-form-button">
                        <Button  type="danger" icon="redo" onClick={this.showConfirm}>
                            点我手动上报
                        </Button>
                    </div>
                    <Table pagination="false" dataSource={this.state.dataSource} columns={this.columns}/>
                </div>
            </div>
        )
    }
}