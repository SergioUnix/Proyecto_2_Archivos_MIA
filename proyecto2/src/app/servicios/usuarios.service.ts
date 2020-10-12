import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';     /// modulo encargado de hacer las peticiones http
import {Usuario} from '../modelos/Usuario';          //importo tipo interfaz 
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';

  public logeado=null;   ///me dice si el usuario esta loogeado


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


constructor(private http: HttpClient,private router:Router) {   }
//// guardo sesion en el localhost  una var con solo el codigo, otra con solo el nombre y la otra con el objeto total
setSesion(usuariorecibido:Usuario){
  this.usuario=usuariorecibido; /// lleno mi variable tipo Usuario con los datos obtenidos
  localStorage.setItem("id_usuario", usuariorecibido.id_usuario.toString());
  localStorage.setItem("nombre", usuariorecibido.nombre.toString());
  localStorage.setItem("fk_tipo", usuariorecibido.fk_tipo.toString());
  localStorage.setItem("usuario", JSON.stringify(this.usuario)) /// guardo en el localhost mi variable usuario de tipo Usuario
 
}
OutSesion(){ 
localStorage.setItem("id_usuario", '');
localStorage.setItem("nombre", '');
localStorage.setItem("fk_tipo", '');
localStorage.setItem("usuario", '')
  this.logeado=null;

  this.router.navigate(['/login']);
 

}

getSesionNombre(){
let nombre= localStorage.getItem("nombre");
return nombre;
}

getSesionCod(){
let cod_usuario= localStorage.getItem("id_usuario");
return cod_usuario;
}
//convierte el String a Objeto y lo devuelve
getSesionObjeto(){
let devolver_usuario= JSON.parse(localStorage.getItem("usuario"));
return devolver_usuario;
}
//Obtengo el codigo del tipo de usuario y lo devuelvo
getSesionTipo(){
  let cod_tipo_fk= localStorage.getItem("fk_tipo");
  return cod_tipo_fk;
  }


///verificar si el usuario esta loogeado
getlog(){
  return this.logeado;
}
setlog(){
  this.logeado=true;
}

//metodo para logearse
loginUsuario(correo: string, pass:string ){
  return this.http.get(`${this.API_URI}/usuario/'${correo}'/${pass}`);
  }










//metodo para pedir 
getUsuarios(){
return this.http.get(`${this.API_URI}/usuarios`);
}

//metodo para pedir Auxiliare
getUsuarios_auxiliares(){
  return this.http.get(`${this.API_URI}/usuarios/auxiliar/lista/aux/`);
  }

//metodo para obtener 
getUsuario(id: string){
return this.http.get(`${this.API_URI}/usuarios/${id}`);
}

//metodo para guardar 
saveUsuario(usuario:Usuario){
return this.http.post(`${this.API_URI}/usuarios`, usuario);

}
//metodo de borrar
deleteUsuario(id: string){
return this.http.delete(`${this.API_URI}/usuarios/${id}`);
}
//metodo de actualizar 
updateUsuario(id:string, updatedUsuario:Usuario):Observable<any> {
return this.http.put(`${this.API_URI}/usuarios/${id}`, updatedUsuario);

}

}
