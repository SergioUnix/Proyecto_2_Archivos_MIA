import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Chat } from 'src/app/modelos/Chat';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  conversaciones: any=[];
  mensajes: any=[];

  public API_URI='';

    public fk_usuario=0;

    public id_cliente=0;

    public id_producto=0;

    public id_propietario=0;

  chat:Chat={
    id_chat:  0,
    mensaje: '',
    fk_vendedor:  0,
    fk_cliente:  0,
    fk_producto:0,
    fecha_creacion: ''
  };



  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    //sino esta logueado me redirecciona al login
    if(this.usuariosService.getSesionNombre()==''){
    console.log("No Logeado --productos-lista");
    this.router.navigate(['/login']);
    }


    this.id_cliente=Number(this.usuariosService.getSesionCod());






///llamo las conversaciones
this.getCconversaciones();


  //sin sockets
   this.sinSocket();
   
  }









  onPublicar(form:NgForm){
    //   console.log( form);
         if(form.valid){
       this.saveNewChat();
       form.resetForm();
       }else{
       //this.Visualizar_Error2();
       }
       
       }
  
  
  
       saveNewChat(){
        delete this.chat.id_chat;
        delete this.chat.fecha_creacion;
        this.chat.fk_cliente =Number(this.usuariosService.getSesionCod());
        this.chat.fk_vendedor = Number(this.id_propietario);
        this.chat.fk_producto= this.id_producto;
        console.log(this.chat);
        this.productosService.saveChat(this.chat)
          .subscribe(
            res=> {
              console.log(res);
              this.getMensajes(this.id_propietario.toString(),this.id_producto.toString());  

            },
            err=> console.error(err)
      
          ) 
        }
  





getMensajes(id_usuario_propietario:string,id_producto_captado:string){   

let id_cliente=Number(this.usuariosService.getSesionCod());
this.id_propietario=Number(id_usuario_propietario);
this.fk_usuario=id_cliente;
this.id_producto=Number(id_producto_captado);

  this.productosService.getChats(id_cliente.toString(),id_usuario_propietario.toString(),id_producto_captado.toString()).subscribe(  
    res => {
      console.log(res)
    this.mensajes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    //this.API_URI='http://localhost:3000/';
    },
    err => console.error(err)
    );
   }
  





//obtengo las conversaciones de un producto
getCconversaciones(){
  let id_vendedor=Number(this.usuariosService.getSesionCod());
  this.productosService.getConversaciones(id_vendedor.toString()).subscribe(  /// 
    res => {
    this.conversaciones= res;
    this.API_URI='http://localhost:3000/';   

    },
    err => console.error(err)
    );}








    sinSocket(){
   
      setTimeout(( ) =>{ 
        
        if(this.mensajes.length>0)  {
          this.getMensajes(this.id_propietario.toString(),this.id_producto.toString()); }
        
        this.sinSocket();}   ,   3000);
    }
  

}
