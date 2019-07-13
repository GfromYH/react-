/*
分装axios请求
优化利用promise处理异步请求
 */
import axios from 'axios'
import {message}from 'antd'
export default function ajax(url,data={},methods='GET'){
    return new Promise( (resolve,reject)=>{
        let promise;
        if (methods === 'GET') {
            promise=axios.get(url,{params:data})
        }else if (methods === 'DELETE') {
            promise = axios.delete(url)
        }else{
            promise = axios.post(url,data)
        }
        //如果成功了调用resolve
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error("请求出错"+error.message)
        })
    })
}
