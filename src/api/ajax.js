/*
    发送异步ajax请求的函数
    封装axios库
    函数的返回值是promise对象
    1.优化: 统一处理请求异常
    2.优化: 异步得到的不是response, 而是response.data
            请求成功时resolve: resolve(response.data)
 */
import axios from 'axios'
import {message} from "antd";
export default function ajax(url, data = {}, method = 'GET') {

    return new Promise(((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        // 2. 成功调用resolve
        promise.then((response) => {
            resolve(response.data)
        // 3. 失败不调用reject, 而是提示异常信息
        }).catch(error => {
            message.error('别瞎请求啊好兄弟, ' + error.message)
        })
    }))


}