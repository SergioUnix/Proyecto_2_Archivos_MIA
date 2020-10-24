import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Denuncia } from 'src/app/modelos/Denuncia';   //importo el tipo de dato,
import { Chat } from 'src/app/modelos/Chat';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
  public isError2=false; 
  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

  public ref_publi=0;

  id_producto=0;
  id_cliente=0;
  mensajes: any=[];


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

  chat:Chat={
    id_chat:  0,
    mensaje: '',
    fk_vendedor:  0,
    fk_cliente:  0,
    fk_producto:0,
    fecha_creacion: ''
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
   
//seteo la variable del id_cliente que es el usuario logueado
this.id_cliente=Number(this.usuariosService.getSesionCod());


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
        //mando a llamar los mensajes
        this.getMensajes();
        },
        err => console.error(err)
      )


}






    }














    Visualizar_Error2(){
      this.isError2=true; 
      setTimeout(( ) =>{this.isError= false;}   ,   3000);
    }




     Visualizar_Exito(){
      this.isExito=true; 
      setTimeout(( ) =>{this.isExito= false;}   ,   3000);
    }


    onPublicar(form:NgForm){
  //   console.log( form);
       if(form.valid){
     this.saveNewChat();
    
     }else{
     this.Visualizar_Error2();
     }
     
     }



     saveNewChat(){
      delete this.chat.id_chat;
      delete this.chat.fecha_creacion;
      this.chat.fk_cliente =Number(this.usuariosService.getSesionCod());
      this.chat.fk_vendedor = Number(this.producto.fk_usuario);
      this.chat.fk_producto= this.id_producto;
      console.log(this.chat);
      this.productosService.saveChat(this.chat)
        .subscribe(
          res=> {
            console.log(res);
            this.getMensajes();
          },
          err=> console.error(err)
    
        ) 
      }




















    getMensajes(){   
     
      let id_cliente=Number(this.usuariosService.getSesionCod());
      this.productosService.getChats(id_cliente.toString(),this.producto.fk_usuario.toString(),this.id_producto.toString()).subscribe(  
        res => {
        this.mensajes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
        },
        err => console.error(err)
        );
       }






}
