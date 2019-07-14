/*
配置各种对应的请求接口
 */
import  jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'
//登录请求
export const reqLogin=(username,password)=>ajax('/api/user/login',{username,password},'POST');
//注册请求
export const reqAddUser=(user)=>ajax('/api/manage/user/add',user,'POST');

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
