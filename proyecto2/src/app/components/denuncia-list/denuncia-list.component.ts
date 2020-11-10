import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Denuncia } from 'src/app/modelos/Denuncia';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-denuncia-list',
  templateUrl: './denuncia-list.component.html',
  styleUrls: ['./denuncia-list.component.css']
})
export class DenunciaListComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  public admin_funcion = false;
  public cliente_funcion = false;

  public error=false; 
  public exito=false; 
  public denuncias: any=[];


//Aca se guarda la informacion del producto..
  producto: Producto ={  
      id_producto: 0,
      producto: '',
      estado: '',
      fk_usuario: 0,
      precio: 0,
      detalle: '',
      fk_categoria: 0,
      foto: ''     
  };

  denuncia: Denuncia={
    id_denuncia: 0,
    descripcion: '',
    fecha_creacion: '',
    fk_admin: 0,
    fk_usuario: 0,
    fk_producto: 0,
    fk_estado: 0
  }


  edit:boolean =false;  ///si este esta en falso significa que quiero guardar un elemento, si esta en verdadero quiero actualizar un producto
  accion: string='Agregar Producto';

  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

          // Obtengo los privilegios segun el tipo de rol
          this.onCheckUser();
          //metodo que verifica si hay usuario logueado
        this.loginExist();
   

 //llamo todas las denuncias....
this.productoDenuncias();       
   
}



menasje_exito(){
  this.exito=true; 
  setTimeout(( ) =>{this.exito= false;}   ,   3000);
}
mensaje_error(){
  this.error=true; 
  setTimeout(( ) =>{this.error= false;}   ,   3000);
}










productoDenuncias(){
  let id_user =this.usuariosService.getSesionCod();
  this.productosService.getdenunciasAll()
    .subscribe(
    res =>{
      console.log(res)
     this.denuncias=res;
      },
      err => console.error(err)
    )
  }



  deleteDenuncia(id:string){//elimina solo una Denuncia
    var id_user  =this.usuariosService.getSesionCod();
    this.productosService.deleteDenuncia(id).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
    res => {     
      //////////////////////////////////////////////////////////
let descripcion ='El administrador Elimino una denuncia realizada por un usurio ';
let tipo='Denuncia';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
      location.reload();    ///refresco pagina     
    },
    err => {console.error(err);}
    );
  }


  updateDenuncia(id:string,estado:string){//elimina solo una Denuncia
    var id_user  =this.usuariosService.getSesionCod();
    this.productosService.updateDenuncia(id,estado).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
    res => {
 //////////////////////////////////////////////////////////
let descripcion ='El administrador Atendio una denuncia ';
let tipo='Denuncia';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
      location.reload();    ///refresco pagina     
    },
    err => {console.error(err);}
    );
  }



















///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}





loginExist(){
  ///si no esta logueado redirecciona a login
  if(this.usuariosService.getSesionNombre()==''){
  this.router.navigate(['/login']);    
 }}


/// Privilegios segun el tipo de Usuario
onCheckUser(): void {
  if (this.usuariosService.getSesionTipo()=='1') {
    this.admin_funcion = true; 
    this.cliente_funcion=true;
  
  } else if(this.usuariosService.getSesionTipo()=='2') {
    this.admin_funcion = true; 
    this.cliente_funcion=true;

  }}




}
