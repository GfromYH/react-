import React, {Component, Fragment} from 'react'
import {Form,Input,Select} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option
 class AddForm  extends Component {
    constructor(props) {
        super(props);
    }
     static propTypes={
         parentId:PropTypes.string.isRequired,
         setForm:PropTypes.func.isRequired,
         categories:PropTypes.array.isRequired
     }

     componentWillMount() {
         const setForm = this.props.setForm
         setForm(this.props.form)
     }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {parentId,categories} = this.props
        return (
            <Form>
                <Item>
                    {getFieldDecorator('parentId',{
                        initialValue:parentId
                    })(
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                categories.map(category=><Option value={category._id} key={category._id}>{category.name}</Option>)
                            }
                        </Select>
                    )}

                </Item>
                <Item>
                    {getFieldDecorator('name',{
                        initialValue:'',
                        rules: [{ required: true, message: '该值不能为空' }],
                    })(
                        <Input placeholder="请输入分类或商品名称"/>
                    )}

                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)
