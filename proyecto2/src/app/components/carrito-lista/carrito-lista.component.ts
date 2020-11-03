import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Comentario } from 'src/app/modelos/Comentario';   //importo el tipo de dato,
import { Contador } from 'src/app/modelos/Contador'; 
import { Likes } from 'src/app/modelos/Like';     
import { DisLikes } from 'src/app/modelos/DisLikes';    
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,



@Component({
  selector: 'app-carrito-lista',
  templateUrl: './carrito-lista.component.html',
  styleUrls: ['./carrito-lista.component.css']
})
export class CarritoListaComponent implements OnInit {

  @HostBinding('class') classes='row';  //necesario para desplegar un juego a la par de otro 
  public admin_funcion = false;
  public cliente_funcion = false;

  public error=false; 
  public exito=false; 



  public API_URI='http://localhost:3000/';


  productosCarrito: any=[];


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


  edit:boolean =false;  ///si este esta en falso significa que quiero guardar un elemento, si esta en verdadero quiero actualizar un producto
  accion: string='Agregar Producto';

  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
       // Obtengo los privilegios segun el tipo de rol
       this.onCheckUser();
       //metodo que verifica si hay usuario logueado
     this.loginExist();




const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
    this.captoUsuario(params.id);

   }



 //obtengo todos los productos del carrito de ese usuario
   this.getproductosCarrito();
   
  
  }




  getproductosCarrito(){    //mando a llamar productos que no fueron creados por el usuario logueado
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getProductosCarrito(id).subscribe(  /// 
      res => {
        this.productosCarrito = res;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
       },
      err => console.error(err)
    );
     }









async captoUsuario(id:string){
    if(id){        //este params.id me detecta el numero
      await this.usuariosService.getUsuarioPorId(id)
        .subscribe(
        res =>{
          console.log("usuario traido de una consulta")
          console.log(res)
          this.usuario=res; 
         // this.API_URI="http://localhost:3000/"
      
        },
          err => console.error(err)
        ) 
  }}
   







     menasje_exito(){
      this.exito=true; 
      setTimeout(( ) =>{this.exito= false;}   ,   3000);
    }
    mensaje_error(){
      this.error=true; 
      setTimeout(( ) =>{this.error= false;}   ,   3000);
    }

    onPublicar(form:NgForm){
      // console.log( form);
     if(form.valid){
     //this.saveNewComentario();
    
     }else{
     this.mensaje_error();
     }
     
     }







 ////Quita todo del Carrito
 quitarTodoCarrito(){
  }
  




//crear Factura
crearfactura(){
    
  }
  
  
  
    /// Facturar
  compra(){
  
    
  
  
  
  }




  
  //guardarDetalle(detalle:Detalle){
   
   //}
  


  
   pasarAvendido(){
    
  
  
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
