import React,{Component,Fragment} from 'react'
import './index.less'
import favicon from '../../asserts/images/favicon.ico'
import { Menu, Icon } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
 class LeftNav extends Component{
    constructor(props){
        super(props);
    }
    //动态添加列表
    //通过reduce+递归，也可以map+递归
    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname

        return menuList.reduce((pre,item)=>{
           if (!item.children) {
               pre.push((
                   <Menu.Item key={item.key}>
                       <Link to={item.key}>
                           <Icon type={item.icon} />
                           <span>{item.title}</span>
                       </Link>
                   </Menu.Item>
               ))
           }else{
               const cItem=item.children.find(citem=>citem.key===path)
               if (cItem) {
                   this.openKey=item.key
               }
               pre.push((
                   <SubMenu
                       key={item.key}
                       title={
                           <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                           </span>
                       }
                   >
                       {this.getMenuNodes(item.children)}
                   </SubMenu>
               ))
           }
           return pre
       },[])
    }
    componentWillMount() {
        this.menuNodes=this.getMenuNodes(menuList)
    }

     render() {
        const path=[this.props.location.pathname]
        const openPath=this.openKey
        return(
            <Fragment>
                <div className="left-nav">
                    <header className="left-nav-header">
                        <Link to="/home">
                        <img src={favicon} alt=""/>
                        <span>后台管理</span>
                        </Link>
                    </header>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={path}
                        defaultOpenKeys={openPath}
                    >
                        {
                            this.menuNodes
                        }
                    </Menu>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(LeftNav)
