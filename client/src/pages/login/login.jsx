import React, {Component, Fragment} from 'react'
import './less/login.less'
import favicon from '../../asserts/images/favicon.ico'
import {Button, Form, Icon, Input, message} from 'antd';
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'

/*
登陆的路由界面
 */
 class Login extends Component{
    constructor(props){
        super(props);
    }
    //验证表单数据
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const {username,password} = values
                const result = await reqLogin(username,password);
                if (result.status===0) {
                    memoryUtils.user=result.data
                    //存储到localStorage中
                    storageUtils.saveUser(memoryUtils.user)
                    message.success("登陆成功")
                    this.props.history.replace('/')
                }else{
                    message.error(result.message)
                }
            }
        });
    }
        render() {
            const { getFieldDecorator } = this.props.form;
            const {user}=memoryUtils;
            if (user&&user._id){
                return <Redirect to="/"></Redirect>
            }
            return (
                <Fragment>
                    <div className="login">
                        <header className="login-header">
                            <img src={favicon} alt=""/>
                            <p>后台管理系统</p>
                        </header>
                        <main className="login-main">
                            <section className="login-content">
                                <p>用户登录</p>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules:
                                                [
                                                    {required: true, message: '用户名不能为空!'},
                                                    {min: 4, message: "用户名至少4位"},
                                                    {max: 12, message: "用户名最多12位"},
                                                    {pattern: /^[a-zA-Z0-9]+$/, message: "用户名只能是字母数字下划线组成"},
                                                ],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                placeholder="Username"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {required: true, message: '用户名不能为空!'},
                                                {min: 4, message: "用户名至少4位"},
                                                {max: 12, message: "用户名最多12位"},
                                                {pattern: /^[a-zA-Z0-9]+$/, message: "用户名只能是字母数字下划线组成"},
                                                    ],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type="password"
                                                placeholder="Password"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="login-form-button">
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                        Or <a href="javascript:;">register now!</a>
                                    </Form.Item>
                                </Form>
                            </section>
                        </main>
                    </div>
                </Fragment>
            )
        }
    }
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm
