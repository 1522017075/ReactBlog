/*
    保存本地登录信息
 */
import store from 'store'
const USER_KEY = 'user_key'
// eslint-disable-next-line
export default {
    // 保存User
    saveUser(user) {
        store.set(USER_KEY, user)
    },
    // 读取User
    getUser() {
        return store.get(USER_KEY) || {}
    },
    // 删除User
    removeUser() {
        store.remove(USER_KEY)
    }
}