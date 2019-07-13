/*
配置各种对应的请求接口
 */
import ajax from './ajax'
//登录请求
export const reqLogin=(username,password)=>ajax('/api/user/login',{username,password},'POST');
//注册请求
export const reqAddUser=(user)=>ajax('/api/manage/user/add',user,'POST');
