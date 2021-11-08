/*
    发送异步ajax请求的函数
    封装axios库
    函数的返回值是promise对象
 */
import axios from 'axios'
export default function ajax(url, data = {}, method = 'GET') {
    if (method === 'GET') {
        return axios.get(url, {
            params: data
        })
    } else {
        return axios.post(url, data)
    }
}