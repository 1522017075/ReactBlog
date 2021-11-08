/*
    包含应用中所有接口请求函数的模块
 */
import ajax from "./ajax";

const BASE = 'http://ziyanglikezy.xyz:9000'
// export default reqLogin() {
//     ajax('/login', {username}, 'POST')
// }
export const reqLogin = (account) => ajax(BASE + '/checkUser', {account}, 'POST')
export const reqRegister = (account) => ajax(BASE + '/registerUser', {account}, 'POST')