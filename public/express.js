const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
// get post put delete
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public'+'/login.html')
})
app.post('/loginSubmit',(req,res)=>{
    const {email,password} = req.body;
 
    if(email === 'anuram@gmail.com' && password === '1234'){
        res.redirect('/signup');
    }
    else{
        res.send("error")
    }
})
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/public'+'/signup.html')
})
app.listen(3095)
