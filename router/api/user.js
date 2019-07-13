const express=require('express')
const User=require('../../model/User')
// const jwt=require('jsonwebtoken')
// const passport=require('passport')
// 配置路由容器
const router=express.Router()
//注册
router.get('/test',(req,res)=>{
    res.json('success')
})
router.post('/register',(req,res)=>{
    User.findOne({
        username:req.body.username
    })
        .then((user)=>{
            if (user) {
                return  res.status(500).send('该用户名已存在')
            }
            new User({
                username:req.body.username,
                password:req.body.password,
            }).save()
                .then(user=>{
                    res.send(user)
                })
                .catch(err=>{
                    res.send(err)
                })
        })
})
//登录
router.post('/login',(req,res)=>{
    User.findOne({
        username:req.body.username

    })
        .then((user)=>{
            if (!user) {
                return res.json({status:1,message:'用户名不存在'})
            }
            else if (user.password !== req.body.password) {
                return res.json({status:1,message:'密码错误'})
            }else{
                // console.log(user.id)
                // const rule={id:user.id,username:user.username}
                // // jwt.sign(rule,"名字","过期时间","箭头函数")
                // jwt.sign(rule,"secret",{expiresIn:3600},(err,token)=>{
                //     res.json({
                //         success:true,
                //         token:"Bearer " + token,
                //         username:user.username
                //     })
                //
                // })
                return res.json({status:0,message:'登陆成功',data:user})
            }
        })
})
// 根据当前用户获取信息
router.get('/getUser',(req,res)=>{
    res.json({
        id:req.user.id,
        username:req.user.username
    })
})

module.exports=router
