const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
// const passport=require('passport')

const app=express()


//迎入user路由模块
let user=require('./router/api/user')
//category商品分类
let category=require('./router/api/category')

//connect mongodb
mongoose.connect('mongodb://localhost:27017/react-project',{useNewUrlParser:true})
//配置body-parser中间件处理post请求
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//passport初始化
// app.use(passport.initialize());

// require("./config/passport")(passport)

app.use('/api/user',user)
app.use('/api/category',category)

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log('running on port 3001')
})
