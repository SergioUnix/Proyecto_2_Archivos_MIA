import { Component, OnInit, HostBinding } from '@angular/core';

import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista usuario
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,

import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

 
 

  public etiqueta = true;
  public formulario = false;
  
  public recuperaCorreo='';


  public serverDir='http://localhost:3000';


    usuario: Usuario ={
      id_usuario: 0,
      nombre: '',
      apellido: '',
      correo: '',
      contrasenia: '',
      confirmacion: '',
      nac: '',
      pais: '',
      foto: '',
      creditos: '',
      fk_tipo: 0
    }

    recuperacion: Usuario ={
      id_usuario: 0,
      nombre: '',
      apellido: '',
      correo: '',
      contrasenia: '',
      confirmacion: '',
      nac: '',
      pais: '',
      foto: '',
      creditos: '',
      fk_tipo: 0
    }


  
    constructor(private productosService:ProductoService, private usuariosService:UsuariosService, private router: Router) { }
  
    ngOnInit() {
      //metodo que verifica si hay usuario logueado
      this.loginExist();
  

      ///el usuario aveces esta en null,, entonces es necesario setear ese valor a ''  vacio en este caso
      //si el usuario es null
      //this.esNull();
  
    
    
    
    }
  
  

  public isError=false;   

  Visualizar_Error(){
    this.isError=true; 
    setTimeout(( ) =>{this.isError= false;}   ,   3000);
  }
  
  
  
  onLogin(form:NgForm){
   // console.log( form);
  if(form.valid){
  this.setUsuario();
  }else{
  this.Visualizar_Error();
  }
  
  }
  
  
  
  
  
  
    setUsuario(){   
    this.usuario.correo=this.usuario.correo.toLowerCase();
    this.usuario.contrasenia=this.usuario.contrasenia.toLowerCase(); 
    //this.usuariosService.setServerDir(this.serverDir);

    this.usuariosService.loginUsuario(this.usuario.correo,this.usuario.contrasenia)
    .subscribe(
    res=> {      
      this.usuario=res;
      this.usuariosService.setSesion(this.usuario);
      this.usuariosService.setServerDir(this.serverDir);
      this.usuariosService.setlog();
      this.isError=false; 
//////////////////////////////////////////////////////////
      let descripcion ='Este usuario '+this.usuario.nombre+' se acaba de loguear';
      let tipo='Sesion';
      let usuario=this.usuario.id_usuario.toString();
      this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////

setTimeout(( ) =>{        location.reload();     }, 2000);
 

},
err=>{
}
)}
  
  
  
  
  setVariable(){
    this.etiqueta=false;
    this.formulario=true;

  }
  cancelar(){
    this.etiqueta=true;
    this.formulario=false;

  }

  enviar(){
    this.etiqueta=true;
    this.formulario=false;
    this.recuperarUsuario();

  }
  
  
  public mostrar_recuperar=false; 
  recuperarUsuario(){    
    this.recuperaCorreo=this.recuperaCorreo.toLowerCase();
    this.usuariosService.recuperarUsuario(this.recuperaCorreo)
    .subscribe(
    res=> {      
      this.recuperacion=res;
      console.log(res);
      this.recuperaCorreo='';
      this.enviarCorreoRecupera();
      },
    err=>{

      this.mostrar_recuperar=true; 
    setTimeout(( ) =>{this.mostrar_recuperar= false;}   ,   3000);
  
    }
    )}






public envio=false; ///envio de exito de correo 
   
    enviarCorreoRecupera(){    
      this.usuariosService.enviarRestablecerContrasenia(this.recuperacion.nombre,this.recuperacion.apellido,this.recuperacion.correo.toLowerCase(),this.recuperacion.contrasenia,this.recuperacion.confirmacion,this.recuperacion.nac,this.recuperacion.pais,this.recuperacion.foto,this.recuperacion.creditos,this.recuperacion.fk_tipo)
      .subscribe(
      res=> {      
        console.log(res);
        this.envio=true; 
        setTimeout(( ) =>{this.envio= false;}   ,   3000);
              
        },
      err=>{
           
      }
      )}
  
  
  
  







///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}


  
  
  
  
//refrescar la pagina

refrescar(){
  location.reload();

}
  
  
  
  
  
    esNull(){
     ///si esta logueado redirecciona a productos
     if(this.usuariosService.getSesionNombre()==null){
     // console.log("Cambio de null a vacio ");
    
     
    }else{}
  }
  
  
  loginExist(){
     ///si esta logueado redirecciona a productos
     if(this.usuariosService.getSesionNombre()==''){
      console.log("No Logeado ");
     
    }else{this.router.navigate(['/perfil']);}
  }
  
  
  }
  
  
  
  