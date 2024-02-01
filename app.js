const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.get('/api',(req,res) =>{
    res.json({
        message:'wecome to thr api'
    });
});

app.post('/api/posts',verifytoken,(req,res) =>{

    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'post created...',
                authData
            });
        }
    });

});
app.post('/api/login',(req,res)=>{

    const user ={
        id:1,
        username:'shivam',
        email:'shivam23@gmail.com'
    }
    jwt.sign({user},'secretkey',{expiresIn : '30s'},(err,token)=>{
        res.json({
            token
        });
        
    });
});
//format


//verify token
function verifytoken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !=='undefined'){
        //split
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
        res.sendStatus(403);
    }
}

app.listen(1000,()=> console.log('server statrred on port 1000'));