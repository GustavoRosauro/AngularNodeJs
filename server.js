const express = require('express')
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const path = require('path')
const http = require('http');
const bodyParser = require('body-parser');
const clienterouter = require('./rotas/clienterouter/clienterouter');
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
})
const con = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'COMERCIO'    
})
con.connect((err)=>{
    if(err){
        console.log('não conectado')
    }else{
        console.log('conectado com sucesso')
    }
})
app.listen(3000,()=>{
    console.log('porta 3000 ativa');
})
app.use(express.static(__dirname+'/nodejsAngular/dist/nodejsAngular/'))
app.get('/',(req,res)=>res.sendFile(path.join(__dirname)));
const server = http.createServer(app);
app.use(express.json());
app.use('/',clienterouter);