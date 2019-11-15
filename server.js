const express = require( 'express' )
const bodyParser = require('body-parser')
const app = express()
const User = require('./src/mongoose/UserModel')
const PORT = 3030
const mongoose = require('mongoose')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.get('/tags/', async function(req, res){
    let tag = req.query.tag
    let response = await axios.get(`https://9gag.com/v1/tag-posts/tag/${tag}`)
    let data = response.data.data
    res.send(data)

})
app.get('/query/', async function(req, res){
    let query = req.query.search
    let response = await axios.get(`https://9gag.com/v1/search-posts?query=${query}`)
    let data = response.data.data
    res.send(data)

})
app.post('/users' , function(req, res){
    let user = new User(req.body)
    user.save()
    res.end()
} )

app.get('/users/' , function(req, res){
    let UserName = req.query.userName
    let Password = req.query.password
    console.log(UserName + ", " + Password)
    User.find({UserName : UserName, Password : Password}).exec(function(err, user){
        console.log(user)
        if(user!==[]){ res.send(true) }
        else { res.send(false)}
    })
})
    


mongoose.connect( "mongodb://localhost/ExposeBoxUserDB", { useNewUrlParser: true })
app.listen( PORT, function(err, res){
    console.group("the server runs on port " + PORT)
})
