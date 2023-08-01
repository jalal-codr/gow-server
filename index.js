const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app  = express();
app.use(express.json());
app.use(cors({
    origin:'*'
}));
const dburl =  'mongodb+srv://panda:panda@gow.lmyfcdp.mongodb.net/?retryWrites=true&w=majority'
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

const usersTemplate = mongoose.model('users',usersSchema)
const postsTemplate = mongoose.model('posts',postSchema)


app.post('/post-user',(req,res)=>{
    const data = new usersTemplate({
        name: req.body.name,
        email : req.body.email,
    })
    data.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})
app.post('/post-content',(req,res)=>{
    const data = new postsTemplate({
        name: req.body.name,
        body : req.body.email,
        photo: req.body.photo,
        likes:0
    })
    data.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})


app.get('/users',(req,res)=>{
    usersTemplate.find()
    .then((res)=>{
        res.send(res)
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/posts',(req,res)=>{
    try{
        const users = postsTemplate(find());
        res.send(users)
    }
    catch(err){
        res.send(err)
    }
})







const port = 4000||Process.env.port;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})