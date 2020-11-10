import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Producto } from 'src/app/modelos/Producto';   //importo el tipo de dato,
import { Denuncia } from 'src/app/modelos/Denuncia';   //importo el tipo de dato,
import { Chat } from 'src/app/modelos/Chat';   //importo el tipo de dato,
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,
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

  public API_URI='';


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


 usuario_propietario_producto: Usuario ={
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

        //aca capto el usuario dueño del producto
        this.captoUsuario(this.producto.fk_usuario.toString())

        //mando a llamar los mensajes
        this.getMensajes();
        },
        err => console.error(err)
      )


}


//sin socket
this.sinSocket();



    }






    async captoUsuario(id:string){
      if(id){        //este params.id me detecta el numero
        await this.usuariosService.getUsuarioPorId(id)
          .subscribe(
          res =>{
            console.log("usuario traido de una consulta")
            this.usuario_propietario_producto=res; 
            
            //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
           this.API_URI=this.usuariosService.getServerDir()+'/';

          },
            err => console.error(err)
          ) 
    }}










    Visualizar_Error2(){
      this.isError2=true; 
      setTimeout(( ) =>{this.isError= false;}   ,   3000);
    }




     Visualizar_Exito(){
      this.isExito=true; 
      setTimeout(( ) =>{this.isExito= false;}   ,   3000);
    }


    onPublicar(form:NgForm){
    //console.log( form);
    
       if(form.valid){
     this.saveNewChat();
     form.resetForm();
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

//////////////////////////////////////////////////////////
let descripcion ='El usuario envio el siguiente mensaje '+this.chat.mensaje;
let tipo='Chat';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////


            console.log(res);
            this.getMensajes();
          },
          err=> console.error(err)
    
        ) 
      }












///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}







    getMensajes(){   
     
      let id_cliente=Number(this.usuariosService.getSesionCod());
      console.log(id_cliente)
      console.log(this.producto.fk_usuario.toString())
      console.log(this.id_producto.toString())

      this.productosService.getChats(id_cliente.toString(),this.producto.fk_usuario.toString(),this.id_producto.toString()).subscribe(  
        res => {
        this.mensajes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
       
          //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
          this.API_URI=this.usuariosService.getServerDir()+'/';


        },
        err => console.error(err)
        );
       }



       sinSocket(){
   
        setTimeout(( ) =>{ 
          
          if(this.mensajes.length>0)  {
            this.getMensajes(); }
          
          this.sinSocket();}   ,   3000);
      }



}
