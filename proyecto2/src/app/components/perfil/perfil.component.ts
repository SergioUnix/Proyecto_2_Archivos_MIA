import { Component, OnInit, HostBinding } from '@angular/core';
//import { AsigEstuService} from 'src/app/servicios/asig-estu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un juego a la par de otro 
  public admin_funcion = false;
  public cliente_funcion = false;

  public usuario_activo='';
  public buscar='';

  public oculto=false;


  public isExito=false; 

  //usuarios de todo el sistema
  TodosLosproductos: any=[];

  ///productos
  productos: any=[];
  public API_URI='http://localhost:3000/';

  filterPost ='';

  public id_usuario_logueado;



  constructor(private usuariosService:UsuariosService,private productosService:ProductoService, private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
       // Obtengo los privilegios segun el tipo de rol
  this.onCheckUser();
    //metodo que verifica si hay usuario logueado
  this.loginExist();
  //mando a llamar productos que no fueron creados por el usuario logueado
  this.productosVecinos();

  //guardo el codigo logueado
  this.id_usuario_logueado=this.usuariosService.getSesionCod();



  //llamo todos los productos del sistema , solo el admin tiene que verlos
  this.productosAll();

  



      }


      Visualizar_Exito(){
        this.isExito=true; 
        setTimeout(( ) =>{this.isExito= false;}   ,   3000);
      }
      



//cambiar de estado un producto
  cambiar(id_producto:Number){   
  console.log(id_producto);
  this.productosService.updateEstado(id_producto,'Bloquear').subscribe(  /// 
   res => {
  console.log("Estado Cambio");
   this.productosVecinos;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
  },
  err => console.error(err)
  );
  }



//cambiar de estado un producto
  cambiarBloqueo(id_producto:Number){   
  console.log(id_producto);
  this.productosService.updateEstado(id_producto,'Sin Bloquear').subscribe(  /// 
  res => {
  console.log("Estado Cambio");
  this.productosVecinos;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
  },
  err => console.error(err)
  );
  }
  











     productosVecinos(){    //mando a llamar productos que no fueron creados por el usuario logueado
      let  id= this.usuariosService.getSesionCod();
      this.productosService.getProductos(id).subscribe(  /// 
        res => {
          this.productos = res;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
         },
        err => console.error(err)
      );
       }



       productosAll(){    //mando a llamar productos que no fueron creados por el usuario logueado
        let  id= this.usuariosService.getSesionCod();
        this.productosService.getProductosAll().subscribe(  /// 
          res => {
            this.TodosLosproductos = res;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
           },
          err => console.error(err)
        );
         }





///////agregar a carrito

//cambiar de estado un producto lo pasa a estado Carrito para realizar la compra
   agregarCarrito(id_producto:Number){   
   console.log(id_producto);
    this.productosService.updateEstadoCarrito(id_producto,'Carrito',this.id_usuario_logueado).subscribe(  /// 
    res => {
    console.log("Agregado al carrito");
    location.reload();
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
