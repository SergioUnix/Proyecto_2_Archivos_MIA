import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Usuario } from 'src/app/modelos/Usuario';     
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setear-pass',
  templateUrl: './setear-pass.component.html',
  styleUrls: ['./setear-pass.component.css']
})
export class SetearPassComponent implements OnInit {

  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
 


  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  public newPass='';
  public exito = false;
  public error = false;
  public isError=false;   

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



  ngOnInit() {
   const params =this.activatedRoute.snapshot.params;
   console.log(params)
   this.captoUsuario(params.correo,params.contrasenia);
  
  
  }




  mensaje_exito(){
    this.exito=true; 
    setTimeout(( ) =>{this.exito= false;
      this.router.navigate(['/login']);   }   ,   4000);
  }

  mensaje_error(){
    this.error=true; 
    setTimeout(( ) =>{this.error= false;}   ,   5000);
  }





  async captoUsuario(correo:string,pass:string){
    if(correo){        //este params.id me detecta el numero
   
        this.usuariosService.loginUsuario(correo,pass)
        .subscribe(
        res=> {      
          this.usuario=res;
          console.log("usuario obtenido")
          console.log(res)
         
          },
        err=>{
           this.mensaje_error();
    
        }
        )
      
      
      
  }}




  Visualizar_Error(){
    this.isError=true; 
    setTimeout(( ) =>{this.isError= false;}   ,   3000);
  }
  
  


  
onSetear(form:NgForm){
  // console.log( form);
 if(form.valid){
this.updateUsuario();
 }else{
 this.Visualizar_Error();
 }
 
 }





updateUsuario(){
  this.usuario.contrasenia=this.newPass.toLowerCase();
  let fecha=new Date(this.usuario.nac)
  let fechaConFormato= fecha.getDate()+'-'+fecha.getMonth()+'-'+fecha.getFullYear();;
  this.usuario.nac=fechaConFormato;

 console.log('Actualizando usuario')
 console.log(this.usuario)
 console.log(fechaConFormato)

  this.usuariosService.updateUsuario(this.usuario.id_usuario,this.usuario.nombre,this.usuario.apellido,this.usuario.correo,this.usuario.contrasenia,this.usuario.confirmacion,fechaConFormato,this.usuario.pais,this.usuario.foto,this.usuario.creditos,this.usuario.fk_tipo)
  .subscribe(
  res =>{
    console.log(res);
    this.mensaje_exito();
  },
  err => { 
    console.error(err);
    this.mensaje_error();     

  }
)
 

}




















}
