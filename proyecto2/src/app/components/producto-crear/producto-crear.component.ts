import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 


interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {


  public API_URI='';
  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  categorias: any=[];
  file:File;
  photoSelected: string  | ArrayBuffer;

  producto: Producto ={  
      id_producto: 0,
      producto: '',
      estado: '',
      fk_usuario: 0,
      precio: 0,
      detalle: '',
      fk_categoria: 0,
      foto: 'uploads/default/notProducto.jpg',
      palabras:'',
      user_compra: 0  
  };

  edit:boolean =false;  ///si este esta en falso significa que quiero guardar un elemento, si esta en verdadero quiero actualizar un producto
  accion: string='Agregar Producto';

  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
  this.API_URI=this.usuariosService.getServerDir()+'/';


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
  
            //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
              this.API_URI=this.usuariosService.getServerDir()+'/';
  
  
              this.accion='Actualizar Producto'
           },
           err => console.error(err)
        )
        }
    ///mando a llamar las categorias del sistema
    this.getCategorias();

    }





  updateProducto(){

    if(this.file==null){    console.log('si es null jaja');

    this.productosService.updateProducto(this.producto)
    .subscribe(
    res =>{

//////////////////////////////////////////////////////////
let descripcion ='Se creo una actualizacion del producto con el nombre '+this.producto.producto;
let tipo='Actualizacion';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////


      console.log(res);
    this.router.navigate(['/productos/mio']);
    },
    err => console.error(err)
  )
   

    }else{
      console.log('no es nulo....')
      this.productosService.updateProducto2(this.producto.id_producto,this.producto.producto,this.producto.estado,this.producto.fk_usuario,this.producto.precio,this.producto.detalle,this.producto.fk_categoria, this.producto.foto , this.producto.palabras, this.producto.user_compra, this.file)
      .subscribe(
        res=> {

//////////////////////////////////////////////////////////
let descripcion ='Se creo una actualizacion del producto con el nombre '+this.producto.producto;
let tipo='Actualizacion';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////


         console.log(res);
          this.router.navigate(['/productos/mio']);
        },
        err=> console.error(err)
  
      ) 






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


  /////prueba exitosa, sirve para guardar un producto
  save(){

    delete this.producto.id_producto;
    this.producto.estado='Sin Bloquear';
    this.producto.fk_usuario =Number(this.usuariosService.getSesionCod());
    this.producto.precio = Number(this.producto.precio);
    this.producto.fk_categoria =Number(this.producto.fk_categoria);
    console.log(this.producto);
    console.log('verifico si se metio en el objeto')
    console.log(this.file)
    if(this.file==null){    console.log('si es null jaja');
    this.productosService.saveProducto2(this.producto)
    .subscribe(
      res=> {
       console.log(res);
        
//////////////////////////////////////////////////////////
let descripcion ='Este usuario acaba de crear un producto con el nombre '+this.producto.producto;
let tipo='Crear';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
 
       
       this.router.navigate(['/productos/mio']);
      },
      err=> console.error(err)

    ) 
  
  
  }else{
    this.productosService.saveProducto(this.producto.producto,this.producto.estado,this.producto.fk_usuario,this.producto.precio,this.producto.detalle,this.producto.fk_categoria, this.producto.foto , this.producto.palabras, this.producto.user_compra, this.file)
    .subscribe(
      res=> {


//////////////////////////////////////////////////////////
let descripcion ='Este usuario acaba de crear un producto con el nombre '+this.producto.producto;
let tipo='Crear';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////





       console.log(res);
      this.router.navigate(['/productos/mio']);
      },
      err=> console.error(err)

    ) 


  }
   
    }
  








//obtengo las categorias del sistema
getCategorias(){
  this.productosService.getCategorias().subscribe(  /// 
    res => {
    this.categorias= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}










///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}









}
