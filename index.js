const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app  = express();
app.use(express.json());
app.use(cors({
    origin:'*'
}));
const dburl =  'mongodb+srv://panda:panda@gow.47mkc4o.mongodb.net/?retryWrites=true&w=majority'
async function dbConnection(){
    try{
        await mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("DB connected")
    }catch(err){
        console.log(err)
    }
}
dbConnection();
const usersSchema = new mongoose.Schema({
    name : String,
    email:String,
})
const postSchema = new mongoose.Schema({
    name:String,
    body:String,
    photo:String,
    likes:Number
})

const users = mongoose.model('users',usersSchema)
const posts = mongoose.model('posts',postSchema)


app.post('/post-user',(req,res)=>{
    const data = new users({
        name: req.body.name,
        email : req.body.email,
        photo : req.body.photo
    })
    data.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})
app.post('/post-content',(req,res)=>{
    const data = new posts({
        name: req.body.name,
        body : req.body.body,
        photo: req.body.photo,
        likes:0
    })
    data.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})


app.get('/users',(req,res)=>{
    users.find()
    .then((result)=>{
        res.send(result)
        
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/posts',(req,res)=>{
    posts.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.post('/check-user',(req,res)=>{
    const data = req.body.email;
    users.findOne({email:data})
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>{
        console.log(err)
    })
})







const port = 4000||Process.env.port;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})