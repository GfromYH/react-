/*
配置各种对应的请求接口
 */
import  jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'
//登录请求
export const reqLogin=(username,password)=>ajax('/api/user/login',{username,password},'POST');

//获取列表数据
export const reqList=(parentId)=>ajax('/api/category/getLists',{parentId});

//添加列表数据
export const reqAddList=({name,parentId})=>ajax('/api/category/addList',{name,parentId},"POST");

//修改列表数据
export const reqUpdateList=(id,name)=>ajax(`/api/category/updateList/${id}`,{name},"POST");

//jsonp请求天气
export const reqWeather=(adcode)=>{
    const url=`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=05d4d972e6a4d1e2a619d1faae85c3fb`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            // console.log('jsonp',err,data)
            //请求成功，err位null
            if (!err && data.status === '1') {
                const {city, weather} = data.lives[0]
                resolve({city, weather})
                }else{
                    message.error("请求天气服务失败")
                }

        })
    })
}
// reqWeather(331083)
