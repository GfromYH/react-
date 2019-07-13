/*
用来localStorage存储用户信息
 */
const USER_KEY='user_key'
export default {
    //保存数据
    saveUser(user){
        localStorage.setItem(USER_KEY,JSON.stringify(user))
    },
    //读取数据
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    //删除数据
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }
}
