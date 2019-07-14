import React,{Component,Fragment} from 'react'
import './index.less'
import favicon from '../../asserts/images/favicon.ico'
import {formDate} from '../../utils/formDateUtils'
import {reqWeather} from '../../api/index'
import {withRouter} from "react-router-dom";
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Modal,message } from 'antd';
import LinkButton from '../link-button/linkButton'

const { confirm } = Modal;
 class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            currentTime:formDate(Date.now()),
            weather:'',
            city:'',
        }
    }
    //设置循环定时器更新时间
    getTime=()=>{
       this.intervalTime= setInterval(()=>{
           const currentTime=formDate(Date.now())
           this.setState({
               currentTime
           })
       },1000)
    }
    //获取天气
    getWeather=async ()=>{
        const {weather,city} =await reqWeather(331083)
        // console.log(result)
        this.setState({weather,city})
    }
    //获取当前页面的title
     getTitle=(path)=>{
         let title;
         menuList.map(item=>{
            if (item.key===path) {
                 title=item.title
            }else if (item.children) {
               const citem= item.children.find(citem=>citem.key===path)
                if (citem) {
                     title=citem.title
                }
            }
        })
         return title;
     }
     //退出功能
     onExit=()=>{
        const {history}=this.props
         confirm({
             content: '您是否确定要退出用户为XXX的账号',
             onOk:()=> {
                 //删除用户信息
                 storageUtils.removeUser();
                 memoryUtils.user={};
                 history.replace('/login')
                 message.success("退出成功")
             },
         });
     }
    componentDidMount() {
        //获取当前时间
        this.getTime();
        //获取当前天气
        this.getWeather()
    }
    //销毁定时器
    componentWillUnmount() {
        clearInterval(this.intervalTime)
    }

    render() {
        const path = this.props.location.pathname
         const title=this.getTitle(path)
        const {currentTime,weather,city} = this.state
        return(
            <Fragment>
                <header className="header">
                    <section className="header-top">
                        <span>欢迎,{memoryUtils.user.username}</span>
                        <LinkButton  onClick={this.onExit}>退出</LinkButton>
                    </section>
                    <section className="header-bottom">
                        <div className="header-bottom-left">
                            {title}
                        </div>
                        <div className="header-bottom-right">
                            {currentTime}
                            <img src={favicon} alt=""/>
                            {city} {weather}
                        </div>
                    </section>
                </header>
            </Fragment>
        )
    }
}
export default withRouter(Header)
