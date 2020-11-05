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

  public totalCompra=0;



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


  cantidades:any={
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


  variables: any=[];

  getproductosCarrito(){    //mando a llamar productos que no fueron creados por el usuario logueado
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getProductosCarrito(id).subscribe(  /// 
      res => {
        this.productosCarrito = res;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
        for (let i of this.productosCarrito) {
          var atributo='C'+i.id_producto;
          
          //this.cantidades."fdsa"=i.id_producto;
          
          //this.variables.push(atributo i.id_producto)
      
         }
      
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
      setTimeout(( ) =>{this.exito= false;}   ,   5000);
    }
    mensaje_error(){
      this.error=true; 
      setTimeout(( ) =>{this.error= false;}   ,   5000);
    }

    onPublicar(form:NgForm){
      // console.log( form);
     if(form.valid){
     //this.saveNewComentario();
    
     }else{
     this.mensaje_error();
     }
     
     }


public visualizarTotal=false;
public BCompra=false;
///sumar
sumar(){
  this.totalCompra=0;
  let i=4;

  if(this.productosCarrito.length>0){

    for (let index of this.productosCarrito) {
  //let porTagName1=document.getElementsByTagName("input")[i].value;  console.log(porTagName1)
  let precio =Number(document.getElementsByTagName("input")[i].value);
  let cantidad =Number(document.getElementsByTagName("input")[i+1].value);
  let total = precio * cantidad;
  this.totalCompra=this.totalCompra + total;
  document.getElementsByTagName("input")[i+2].value=total.toString();
  i=i+3;
   }

  this.visualizarTotal=true;
  }



  if(this.totalCompra<Number(this.usuario.creditos)){
    this.menasje_exito();
    this.BCompra=true;
  }else{
    this.mensaje_error();

  }


}


quitarACarrito(id_producto:Number){   
  console.log(id_producto);
   this.productosService.updateEstadoCarrito(id_producto,'Sin Bloquear',"0").subscribe(  /// 
   res => {
   console.log("Producto quitado de Carrito");
  // location.reload();
  },
  err => console.error(err)
  );
}

quitarACarrito2(id_producto:Number){   
  console.log(id_producto);
   this.productosService.updateEstadoCarrito(id_producto,'Sin Bloquear',"0").subscribe(  /// 
   res => {
   console.log("Producto quitado de Carrito");
  location.reload();
  },
  err => console.error(err)
  );
}




 ////Quita todo del Carrito
 quitarTodoCarrito(){

  for (let index of this.productosCarrito) {
    this.quitarACarrito(index.id_producto);
  }

  }
  




//crear compra
crearCompra(){
  this.productosService.saveCompra(this.usuario.id_usuario.toString()).subscribe(  /// 
    async res => {
    console.log("Codigo compra creado");
    await this.Detalles();
   // location.reload();
   },
   err => console.error(err)
   );
    
  }
  
  
  
    /// 
  crearDetalle(cantidad:string, fk_producto:string,fk_compra:string){
  
    this.productosService.saveDetalle(cantidad,fk_producto,fk_compra).subscribe(  /// 
      res => {
      console.log("Detalle creado");
      console.log(res);
     },
     err => console.error(err)
     );
    
  
  
  
  }




  ////  Obtengo el ultimo codigo de compra para realizar los detalles
 Detalles(){
    let respuesta;
    this.productosService.getCodigoUltimaCompra(this.usuario.id_usuario.toString()).subscribe(  /// 
      async res => {
        respuesta=res;

     
        let i=4;
      
        if(this.productosCarrito.length>0){
      
          for (let index of this.productosCarrito) {
        
        let precio =Number(document.getElementsByTagName("input")[i].value);
        let cantidad =Number(document.getElementsByTagName("input")[i+1].value);
        let total = precio * cantidad;
        
       await this.crearDetalle(cantidad.toString(),index.id_producto,respuesta.id_compra);
      let mensaje='Se ha comprado el producto con codigo '+index.id_producto+' con nombre: '+index.producto+' y detalle: '+index.detalle;
       await this.enviarCorreoCompraVenta(index.correo,'Compra de Producto',mensaje);

        i=i+3;
         }
        }
        let mensaje2='Se ha realizado una compra el codigo de la compra es : '+respuesta.id_compra +' el valor gastado es : '+this.totalCompra;
        await this.enviarCorreoCompraVenta(this.usuario.correo,'Compra en SalesGT',mensaje2);
 
        await this.quitarTodoCarrito();
    ///correohacia vendedor
    //this.correoVendedor
    setTimeout(( ) =>{location.reload();  }   ,   5000);
     },
     err => console.error(err)
     );
  

  }


  enviarCorreoCompraVenta(correo:string, asunto:string, mensaje:string){
  
    this.productosService.enviarCorreoCompraVenta(correo,asunto,mensaje).subscribe(  /// 
      res => {
      console.log("----------  correo enviado");
      console.log(correo);
      console.log(res);
     },
     err => console.error(err)
     );
    
  
  
  
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
