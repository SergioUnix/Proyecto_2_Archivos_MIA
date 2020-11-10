import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista usuario
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,

import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';


interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-perfil-update',
  templateUrl: './perfil-update.component.html',
  styleUrls: ['./perfil-update.component.css']
})
export class PerfilUpdateComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  public API_URI='';
  public admin_funcion = false;
  public cliente_funcion = false;
  public usuario_activo='';
  public buscar='';

  id_usuario=0;

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


 MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

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

public fecha;


  constructor(private productosService: ProductoService,private usuariosService:UsuariosService, private router: Router, private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {
///existe login?
this.loginExist();

   // Obtengo los privilegios segun el tipo de rol
   this.onCheckUser();

const params =this.activatedRoute.snapshot.params;
this.captoUsuario(params.id);
  }



  async captoUsuario(id:string){
    if(id){        //este params.id me detecta el numero
      await this.usuariosService.getUsuarioPorId(id)
        .subscribe(
        res =>{
          console.log("usuario traido de una consulta")
          console.log(res)
          this.usuario=res; 
          
  //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
  this.API_URI=this.usuariosService.getServerDir()+'/';


         this.ponerfecha();
        },
          err => console.error(err)
        ) 
  }}

  ponerfecha(){
    this.fecha=new Date(this.usuario.nac);

  //this.fecha.getFullYear()   //devuelve el año en cuatro cifras
  this.anio=this.fecha.getFullYear();
  
  // this.fecha.getMonth()   //Devuelve la representación interna del mes. OJO: 0 Enero - 11 Diciembre.
   this.mes=this.fecha.getMonth()+1;
   if(Number(this.mes)<10){this.mes="0"+this.mes}
   
   //this.fecha.getDate()     //Devuelve el día del mes.
   this.dia=this.fecha.getDate();
   if(Number(this.dia)<10){this.dia="0"+this.dia}





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



    
  onUsuario(form:NgForm){
    // console.log( form);
   if(form.valid){
   this.updateUsuario();
   }else{
   //this.Visualizar_Error();
   }
   
   }






   updateUsuario(){
    this.usuario.id_usuario =Number(this.usuariosService.getSesionCod());
    this.usuario.contrasenia=this.usuario.contrasenia.toLowerCase();
    this.usuario.correo=this.usuario.correo.toLowerCase();
    
   let nuevaFecha=this.dia.toString()+'-'+this.mes.toString()+'-'+this.anio.toString();
   //this.usuario.nac=nuevaFecha

   console.log(nuevaFecha)
 console.log('usuario enviado')
   console.log(this.usuario)

    if(this.file==null){    console.log('si es null jaja, datos para el update....');
    console.log(this.usuario)

    this.usuariosService.updateUsuario(this.usuario.id_usuario,this.usuario.nombre,this.usuario.apellido,this.usuario.correo,this.usuario.contrasenia,this.usuario.confirmacion,nuevaFecha,this.usuario.pais,this.usuario.foto,this.usuario.creditos,this.usuario.fk_tipo)
    .subscribe(
    res =>{
      console.log(res);

      this.usuariosService.setSesion(this.usuario);
//////////////////////////////////////////////////////////
let descripcion ='El usuario Actualizo sus datos ';
let tipo='Actualizacion';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////


      location.reload();
      


    },
    err => console.error(err)
  )
   

    }else{
      console.log('no es nulo.... objeto enviado')
      console.log(this.usuario)
      this.usuariosService.updateUsuario2(this.usuario.id_usuario,this.usuario.nombre,this.usuario.apellido,this.usuario.correo,this.usuario.contrasenia,this.usuario.confirmacion,nuevaFecha,this.usuario.pais,this.usuario.foto,this.usuario.creditos,this.usuario.fk_tipo, this.file)
      .subscribe(
        res=> {
         console.log(res);
      
         this.usuariosService.setSesion(this.usuario);
//////////////////////////////////////////////////////////
let descripcion ='El usuario Actualizo sus datos con una foto nueva';
let tipo='Actualizacion';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////

        location.reload();
         

        },
        err=> console.error(err)
  
      ) 
   }

  }










///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}






  /// Privilegios segun el tipo de Usuario
  onCheckUser(): void {
    if (this.usuariosService.getSesionTipo()=='1') {
      this.admin_funcion = true; 
      this.cliente_funcion=true;
   
    } else if(this.usuariosService.getSesionTipo()=='2') {
      this.admin_funcion = true; 
      this.cliente_funcion=true;
        
    }}

    loginExist(){
      ///si no esta logueado redirecciona a login
      if(this.usuariosService.getSesionNombre()==''){
      this.router.navigate(['/login']);    
     }}

}
