const express=require('express')
const Category=require('../../model/Category')
// const jwt=require('jsonwebtoken')
// const passport=require('passport')
// 配置路由容器
const router=express.Router()
//测试
router.get('/test',(req,res)=>{
    res.json('success')
})
//获取所有商品分类
router.get('/getLists',(req,res)=>{
    // console.log(req.query)
    Category.find({
        parentId:req.query.parentId
    })
        .then((list)=>{
            res.json({
                status:'0',
                // data:list
                data:list
            })
        })
})
//增加商品分类
router.post('/addList',(req,res)=>{
    Category.findOne({
        name:req.body.name
    })
        .then((list)=>{
            if (list) {
                res.json({
                    status:'1',
                    message:'该商品分类已存在'
                })
            }
            new Category({
                name:req.body.name,
                parentId:req.body.parentId,
            }).save()
                .then(list=>{
                    res.json({
                        status:'0',
                        data:list
                    })
                })
                .catch(err=>{
                    res.send(err)
                })

        })
})
// 修改商品分类
router.post('/updateList/:id',(req,res)=>{
    let listFields={}
    if(req.body.name){listFields.name=req.body.name}
    if(req.body.parentId){listFields.parentId=req.body.parentId}
    Category.findOneAndUpdate({_id:req.params.id},{$set:listFields},{new:true}).then(list=>{
        res.json({
            status:'0',
            data:list
        })
    })
})

module.exports=router
