const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
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
app.use(express.json());
app.get('/clientes',(req,res)=>{
    con.query(`SELECT ID,
                      NOME,
                      EMAIL,
                      IDADE 
                      FROM CLIENTES 
                      ORDER BY NOME`,(err,rows)=>{
        if(err) console.log(err);
        else res.send(rows)
    })
});
app.post('/cliente',(req,res)=>{
    console.log(req.body.NOME);
    let nome =  req.body.NOME;
    let email = req.body.EMAIL;
    let idade = req.body.IDADE;
    con.query(`INSERT INTO CLIENTES (NOME,EMAIL,IDADE) 
                            VALUES ('${nome}','${email}',${idade})`)
    res.send(true);
})
app.delete('/cliente/:id',(req,res)=>{
    let id = req.params.id;
    con.query(`DELETE FROM CLIENTES WHERE ID = ${id}`);
    res.send(true);
})
app.put('/cliente/:id',(req,res)=>{
    let id = req.params.id;
    let nome = req.body.NOME;
    let email = req.body.EMAIL;
    let idade = req.body.IDADE;
    con.query(`UPDATE CLIENTES SET NOME = '${nome}',
                               IDADE = ${idade}, 
                               EMAIL = '${email}' 
                               WHERE ID = ${id}`)
    res.send(true); 
});