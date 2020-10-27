import { Component, OnInit, HostBinding } from '@angular/core';

import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista usuario
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,

import { NgForm } from '@angular/forms';


interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  public isError=false;
  public isErrorGuardar=false; 
  public isExito=false;

  public anio:string='';
public mes:string='';
public dia:string ='';

public hora:string='';
public minuto:string=''; 
  
file:File;
photoSelected: string  | ArrayBuffer;

    usuario: Usuario ={
      id_usuario: 0,
      nombre: '',
      apellido: '',
      correo: '',
      contrasenia: '',
      confirmacion: 'No Confirmado',
      nac: '',
      pais: '',
      foto: 'uploads/default/notImage.jpg',
      creditos: '10000',
      fk_tipo: 2
    }
  
    constructor(private usuariosService:UsuariosService, private router: Router) { }
  
    ngOnInit() {

  
  
    
    
    
    }
  
  
  Visualizar_Error(){
    this.isError=true; 
    setTimeout(( ) =>{this.isError= false;}   ,   3000);
  }
  
  
  
  onUsuario(form:NgForm){
   // console.log( form);
  if(form.valid){
  this.saveUsuario();
  }else{
  this.Visualizar_Error();
  }
  
  }
  
  onPhotoSelected(event:HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]) {
    this.file=<File>event.target.files[0];
    //imagen prev
    const reader =new FileReader();
    reader.onload= e=> this.photoSelected =reader.result;
    reader.readAsDataURL(this.file);
    }
  }
  



  
  
 //Guardar 
 saveUsuario(){
   this.usuario.contrasenia=this.usuario.contrasenia.toLowerCase();
   this.usuario.correo=this.usuario.correo.toLowerCase();
   delete this.usuario.id_usuario;
   
  this.usuario.nac=this.dia+'-'+this.mes+'-'+this.anio;
 console.log(this.usuario);
    console.log(this.file)
   
    if(this.file==null){    console.log('si es null jaja');
   this.usuariosService.saveUsuario(this.usuario)
    .subscribe(
      res=> {
      console.log(res);
      this.router.navigate(['/login']);
      },
      err=> console.error(err)

    ) 
  
  
  }else{      console.log('Si hay Foto');
    this.usuariosService.saveUsuario2(this.usuario.nombre,this.usuario.apellido,this.usuario.correo,this.usuario.contrasenia,this.usuario.confirmacion,this.usuario.nac,this.usuario.pais,this.usuario.foto,this.usuario.creditos,this.usuario.fk_tipo, this.file)
   .subscribe(
      res=> {
      console.log(res);
  this.router.navigate(['/login']);
     },
    err=> console.error(err)

   ) 


  }
   
    
    } 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  }
  
  
  
  