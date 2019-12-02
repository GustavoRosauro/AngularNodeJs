import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Cliente } from './model/cliente';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nodejsAngular';
  clientes:any = []
  cliente:Cliente;
  idNumber:number = null;
  constructor(private http:HttpClient){}
  ngOnInit(){
    this.cliente = new Cliente();
    this.preencheLista();
  }
  salvar(){
    console.log(this.cliente)
    if(isNullOrUndefined(this.idNumber)){
    this.http.post('http://localhost:3000/cliente',this.cliente).subscribe(result =>{
        this.preencheLista();
        this.cliente = new Cliente();
    },error => console.log(error));
  }else{
    this.http.put(`http://localhost:3000/cliente/${this.idNumber}`, this.cliente).subscribe(result=>{
      if(result){
        this.preencheLista();
        this.cliente = new Cliente();
        this.idNumber = null;
      }
    },error => console.log(error));
  }
  }
  preencheLista(){
    this.http.get('http://localhost:3000/clientes').subscribe(result=>{
      console.log(result)
      this.clientes = result;
    },error => console.log(error));
  }
  remover(id:number){ 
    if(confirm('deseja remover esse registro')){
    this.http.delete(`http://localhost:3000/cliente/${id}`).subscribe(result =>{
      if(result)
      this.preencheLista();
    },error => console.log(error));
  }
}
editar(id:number){
  let clienteSelected = this.clientes.filter(x => x.ID == id)[0] 
  this.cliente.NOME = clienteSelected.NOME;
  this.cliente.IDADE = clienteSelected.IDADE;
  this.cliente.EMAIL = clienteSelected.EMAIL;
  this.idNumber = clienteSelected.ID;
}
}
