const express = require('express');
const router = express.Router();
const cliente = require('../../controllers/clientecontroller');
router.get('/clientes',(req,res)=>{
    cliente.get(req,res)
});
router.post('/cliente',(req,res)=>{
    cliente.post(req,res);
})
router.delete('/cliente/:id',(req,res)=>{
    cliente.delete(req,res);
})
router.put('/cliente/:id',(req,res)=>{
    cliente.put(req,res)
})
module.exports = router;