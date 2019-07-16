import React, {Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item;
 class UpdateForm  extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes={
        name:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount() {
        const setForm = this.props.setForm
        setForm(this.props.form)
    }

     render() {
        const { getFieldDecorator } = this.props.form;
        const {name} = this.props
        return (
            <Form>
                <Item>
                    {getFieldDecorator('name',{
                        initialValue:name,
                        rules: [{ required: true, message: '该值不能为空' }],
                    })(
                        <Input placeholder="请输入分类或商品名称"/>
                    )}

                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm)
