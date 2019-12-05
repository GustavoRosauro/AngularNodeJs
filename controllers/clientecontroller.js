const express = require('express');
const mysql = require('mysql');
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
exports.get = (req, res) => {
    con.query(`
    SELECT ID,
    NOME,
    EMAIL,
    IDADE 
    FROM CLIENTES 
    ORDER BY NOME`, (err, rows) => {
        if (err) console.log(err);
        else res.send(rows)
    })
}
exports.post = (req,res)=>{
    console.log(req.body.NOME);
    let nome =  req.body.NOME;
    let email = req.body.EMAIL;
    let idade = req.body.IDADE;
    con.query(`INSERT INTO CLIENTES (NOME,EMAIL,IDADE) 
                            VALUES ('${nome}','${email}',${idade})`)
    res.send(true);
}
exports.delete = (req,res)=>{
    let id = req.params.id;
    con.query(`DELETE FROM CLIENTES WHERE ID = ${id}`);
    res.send(true);
}
exports.put = (req,res)=>{
    let id = req.params.id;
    let nome = req.body.NOME;
    let email = req.body.EMAIL;
    let idade = req.body.IDADE;
    con.query(`UPDATE CLIENTES SET NOME = '${nome}',
                               IDADE = ${idade}, 
                               EMAIL = '${email}' 
                               WHERE ID = ${id}`)
    res.send(true);
}