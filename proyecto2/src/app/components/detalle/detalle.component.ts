import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Comentario } from 'src/app/modelos/Comentario';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
  public isError2=false; 
  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

  public ref_publi=0;





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

  comentario:Comentario={
    id_comentario:  0,
    comentario: '',
    fk_producto:  0,
    fk_usuario:  0,
    fecha: ''
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












//obtengo las categorias del sistema
getCategorias(){
  this.productosService.getCategorias().subscribe(  /// 
    res => {
    this.categorias= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}





    Visualizar_Error2(){
      this.isError2=true; 
      setTimeout(( ) =>{this.isError= false;}   ,   3000);
    }

    onPublicar(form:NgForm){
      // console.log( form);
     if(form.valid){
     //this.saveHijo();
    
     }else{
     this.Visualizar_Error2();
     }
     
     }


 











}
