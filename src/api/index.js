/*
    包含应用中所有接口请求函数的模块
 */
import ajax from "./ajax";

// const BASE = 'http://ziyanglikezy.xyz:9000/api'
// const BASE = 'http://localhost:9000/api'
const BASE = ''
// export default reqLogin() {
//     ajax('/login', {username}, 'POST')
// }
export const reqLogin = (account) => ajax(BASE + '/checkUser', {account}, 'POST')
export const reqRegister = (account) => ajax(BASE + '/registerUser', {account}, 'POST')
export const reqCancelAutoUpdate = (user) => ajax(BASE + '/cancelAutoUpdate', user, 'POST')
export const reqStartAutoUpdate = (user) => ajax(BASE + '/startAutoUpdate', user, 'POST')
export const reqRecord = (user) => ajax(BASE + '/record', user, 'POST')
export const reqUpdateBySelf = (user) => ajax(BASE + '/updateBySelf', user, 'POST')