import React,{Component,Fragment} from 'react'
import { Card,Table,Button,message,Icon ,Modal} from 'antd'
import LinkButton from '../../components/link-button/linkButton'
import  {reqAddList,reqList,reqUpdateList} from  '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'
/*
商品分类组件
 */
export default class Category extends Component{
    constructor(props){
        super(props);
        this.state={
            categories:[],
            loading:false,
            parentName:'',
            parentId:'0',
            subCategories:[],
            visible:0 //0关闭对话框 1添加分类 2修改分类
        }
    }
    getInitColumns=()=>{
         this.columns=[

            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width:300,
                key: 'action',
                render: (category) => (
                    <span>
                        <LinkButton style={{marginRight:10}} onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton>
                        {category.parentId==='0'?(<LinkButton onClick={()=>this.showSubCategories(category)}>查看子分类</LinkButton>):null}
                        {/*<LinkButton onClick={()=>this.showSubCategories(category)}>查看子分类</LinkButton>*/}

                    </span>
                ),
            },
        ]

    };

    //显示二级列表
    showSubCategories=(category)=>{
        const {_id,name} = category
        this.setState({
            parentId:_id,
            parentName:name
        },()=>{
            this.getList()
        })
    }
    //显示一级或二级列表
    getList=async (parentId)=>{
        this.setState({loading:true})
        parentId= parentId ||this.state.parentId
        const result= await reqList(parentId)
        const categories=result.data
        // console.log(result.data)
        this.setState({loading:false})
        if (result.status==='0'){
            if (parentId === '0') {
            this.setState({categories,loading:false})
            }else{
                this.setState({subCategories:categories,loading:false})

            }
        } else{
            message.error("初始化数据失败")
        }

    }
    //点击以及列表返回
    showListAgain=()=>{
        // console.log('aaa')
        this.setState({
            parentId:'0',
            subCategories:[],
            parentName:''
        })
    }
    //显示添加对话框
    showAddModal=()=>{
        this.setState({
            visible:1
        })
    }
    //显示修改对话框
    showUpdateModal=(category={})=>{
        this.category=category
        // console.log(this.category)
        this.setState({
            visible:2
        })
    }
    //增加商品分类
    addCategory=()=> {
        // console.log('aaa')
        const form = this.form
        // console.log(this.form)
        form.validateFields( async (err, values) => {
            if (!err) {

                const {name, parentId} = values;
                // console.log(name, parentId)
                form.resetFields('')
                const result = await reqAddList({name,parentId});
                console.log(parentId,this.state.parentId)
                // console.log(result)
                if (result.status === '0') {
                    this.setState({
                        visible: 0
                    }, () => {
                        message.success("添加成功")
                    })
                    if (result.status === this.state.parentId) {
                        //重新读取列表
                        this.getList()
                    } else if (parentId === '0') {
                        this.getList('0')
                    }
                }
            }
        })
    }

    //修改商品分类
    updateCategory= ()=>{
        // console.log('aaa')
        const form = this.form
        // console.log(this.form)
       form.validateFields(async (err,values)=>{
           if (!err) {
               const {name}=values;
               // console.log(this.category._id)
               const id =this.category._id
               // console.log(name)
               const result = await reqUpdateList(id,name);
               //清除默认缓存的值
               form.resetFields('')

               // console.log(result.data)
               this.setState({
                   visible:0
               },()=>{
                   message.success("修改成功")
               })
               //重新读取列表
               this.getList()
           }
       })
    }
    //关闭对话框
    handleCancel=()=>{
        const form = this.form

        //清除默认缓存的值
        form.resetFields('')
        this.setState({
            visible:0
        })
    }
    componentWillMount() {
        this.getInitColumns()
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        const {categories,loading,subCategories,parentId,parentName,visible} =this.state
        const {name} = this.category || {}
        // console.log(name)
        const extra=(
            <Button type="primary" onClick={this.showAddModal}>
                <Icon type="plus"></Icon>
                添加
            </Button>
        )
        const title=parentId==='0'?"一级分类列表":(
            <span>
                <LinkButton onClick={this.showListAgain}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{margin:'0 10px'}}></Icon>
                <span>{parentName}</span>
            </span>
        )
        return(
            <Card
                title={title}
                extra={extra}>
                <Table
                    rowKey="_id"
                    columns={this.columns}
                    dataSource={parentId==='0'?categories:subCategories}
                    bordered={true}
                    loading={loading}
                    pagination={{defaultCurrent:1 ,showQuickJumper:true,defaultPageSize:5 }}
                />
                <Modal
                    title="添加分类/商品"
                    visible={visible===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm setForm={(form)=>this.form=form } categories={categories} parentId={parentId}></AddForm>
                </Modal>

                <Modal
                    title="修改商品分类"
                    visible={visible===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm name={name} setForm={(form)=>this.form=form}></UpdateForm>
                </Modal>

            </Card>
        )
    }
}
