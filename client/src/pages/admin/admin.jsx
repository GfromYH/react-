import React,{Component,Fragment} from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Switch,Route} from 'react-router-dom'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'
import { Layout } from 'antd';
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

const { Footer, Sider, Content } = Layout;
/*
h后台管理的路由界面
 */
export default class Admin extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const user=memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return(
            <Fragment>
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/category" component={Category}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Redirect to='/home'></Redirect>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}
