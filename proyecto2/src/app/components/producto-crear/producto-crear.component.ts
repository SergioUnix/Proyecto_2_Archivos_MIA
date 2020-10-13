import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  categorias: any=[];

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

  edit:boolean =false;  ///si este esta en falso significa que quiero guardar un elemento, si esta en verdadero quiero actualizar un producto
  accion: string='Agregar Producto';

  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
       //sino esta logueado me redirecciona al login
       if(this.usuariosService.getSesionNombre()==''){
        console.log("No Logeado --productos-lista");
        this.router.navigate(['/login']);
      }
   



    const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
      this.productosService.getProducto(params.id)
        .subscribe(
           res =>{
             console.log(res)
            this.producto=res; ///cuando accedo ala ruta game/edit/id ,, aca hago el objeto con el id recibido y eso me muestra en visualizacion
            this.edit= true;
            this.accion='Actualizar Producto'
           },
           err => console.error(err)
        )
        }
    ///mando a llamar las categorias del sistema
    this.getCategorias();

    }



  /////guardo el juego
  saveNewProducto(){

  delete this.producto.id_producto;
  this.producto.estado='Sin Bloquear';
  this.producto.fk_usuario =Number(this.usuariosService.getSesionCod());
  this.producto.precio = Number(this.producto.precio);
  this.producto.fk_categoria =Number(this.producto.fk_categoria);
  console.log(this.producto);
  this.productosService.saveProducto(this.producto)
    .subscribe(
      res=> {
        console.log(res);
        this.router.navigate(['/perfil']);
      },
      err=> console.error(err)

    ) 
  }

  updateProducto(){
    const numero =this.producto.id_producto;
    delete this.producto.id_producto;
    console.log(this.producto);
    this.productosService.updateProducto(numero.toString(), this.producto)
      .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/productos']);
      },
      err => console.error(err)

    )
  }












//obtengo las categorias del sistema
getCategorias(){
  this.productosService.getCategorias().subscribe(  /// 
    res => {
    this.categorias= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}






}
