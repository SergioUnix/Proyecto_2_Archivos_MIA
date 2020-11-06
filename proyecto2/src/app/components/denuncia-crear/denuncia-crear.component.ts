import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Denuncia } from 'src/app/modelos/Denuncia';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-denuncia-crear',
  templateUrl: './denuncia-crear.component.html',
  styleUrls: ['./denuncia-crear.component.css']
})
export class DenunciaCrearComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
  public isError2=false; 
  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

  public ref_publi=0;

  id_producto=0;
  denuncias: any=[];


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
    //sino esta logueado me redirecciona al login
    if(this.usuariosService.getSesionNombre()==''){
    console.log("No Logeado --productos-lista");
    this.router.navigate(['/login']);
  }
   



const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
    this.id_producto=params.id;    //mando el codigo del producto hacia una variable
    this.productosService.getProducto(params.id)
      .subscribe(
      res =>{
        console.log(res)
        this.producto=res; ///cuando accedo ala ruta ,, aca hago el objeto con el id recibido y eso me muestra en visualizacion
        this.edit= true;
        this.accion='Actualizar Producto'
        },
        err => console.error(err)
      )
//llamo el metodo que me muestra las denuncias de este producto que se han hecho con el usuario logueado
this.productoDenunciaUsuario();

}






    }














    Visualizar_Error2(){
      this.isError2=true; 
      setTimeout(( ) =>{this.isError= false;}   ,   3000);
    }

    onDenunciar(form:NgForm){
      // console.log( form);
     if(form.valid){
     this.saveNewDenuncia();
    
     }else{
     this.Visualizar_Error2();
     }
     
     }   



     Visualizar_Exito(){
      this.isExito=true; 
      setTimeout(( ) =>{this.isExito= false;}   ,   3000);
    }








    productoDenunciaUsuario(){
    let id_user =this.usuariosService.getSesionCod();
    this.productosService.getdenuncias_un_usuario_producto(this.id_producto.toString(),id_user)
      .subscribe(
      res =>{
        console.log(res)
       this.denuncias=res;
        },
        err => console.error(err)
      )
    }


 saveNewDenuncia(){

  delete this.denuncia.id_denuncia;
  this.denuncia.fk_admin=1;
  this.denuncia.fk_usuario=Number(this.usuariosService.getSesionCod());
  this.denuncia.fk_producto=this.id_producto;
  this.denuncia.fk_estado=3;
  console.log(this.denuncia);
  this.productosService.saveDenuncia(this.denuncia)
    .subscribe(
      res=> {
        console.log(res);
        location.reload();
        
      },
      err=> console.error(err)

    ) 
  }

  deleteDenuncia(id:string){//elimina solo una Denuncia
    var id_user  =this.usuariosService.getSesionCod();
    this.productosService.deleteDenuncia(id).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
    res => {     
      location.reload();    ///refresco pagina     
    },
    err => {console.error(err);}
    );
  }




}
