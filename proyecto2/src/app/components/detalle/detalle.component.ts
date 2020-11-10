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
import { stringify } from 'querystring';


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

  public haylikes=false;
  public hayDislikes=false;

  public ref_publi=0;

  id_producto=0;


  public API_URI='';


  comentarios: any=[];
  arregloComodinLikes: any=[];


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

  comentario:Comentario={
    id_comentario:  0,
    comentario: '',
    fk_producto:  0,
    fk_usuario:  0,
    fecha_creacion: ''
  };

  like: Likes ={  
    id_likes: 0,
    fecha_creacion: '',
    fk_producto:0,
    fk_usuario: 0
};
Dislike: DisLikes ={  
  id_Dislikes: 0,
  fecha_creacion: '',
  fk_producto:0,
  fk_usuario: 0
};



contadorLikes:Contador={
  contador:0
};
contadorDisLikes:Contador={
  contador:0
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
}
    ///mando a llamar los comentarios de un producto
    this.getComentarios(params.id);

    //contador de likes
    this.CountLikes(params.id);
    //contador de Dislikes
    this.CountDisLikes(params.id);



    }












//obtengo los comentarios de un producto mandando el id_producto
getComentarios(id:string){
  this.productosService.getComentarios(id).subscribe(  /// 
    res => {
    this.comentarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
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
     this.saveNewComentario();
    
     }else{
     this.Visualizar_Error2();
     }
     
     }





     Visualizar_Exito(){
      this.isExito=true; 
      setTimeout(( ) =>{this.isExito= false;}   ,   3000);
    }

  /////guardo el juego
  saveNewComentario(){
    delete this.comentario.id_comentario;
    delete this.comentario.fecha_creacion;
    this.comentario.fk_producto=this.id_producto;
    this.comentario.fk_usuario =Number(this.usuariosService.getSesionCod());
    this.productosService.saveComentario(this.comentario)
      .subscribe(
        res=> {
          console.log(res);
          //this.router.navigate(['/perfil']);
          console.log('Comentario Padre Guardado');
          this.comentario.comentario='';
          this.getComentarios(this.id_producto.toString()); 
          this.Visualizar_Exito();

          //////////////////////////////////////////////////////////
let descripcion ='El usuario realizo un comentario el cual fue '+this.comentario.comentario;
let tipo='Comentario';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
         
        },
        err=> console.error(err)
  
      ) 
    }






async procedimientoLike(){
     this.crearlike();
     this.CountLikes(this.id_producto.toString());
     //location.reload(); 

   
}

crearlike(){
delete this.like.id_likes;
delete this.like.fecha_creacion;
this.like.fk_usuario =Number(this.usuariosService.getSesionCod());
this.like.fk_producto=this.id_producto;
//console.log(this.haylikes)
    this.productosService.saveLike(this.like).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
      res => {
        console.log(res);
       
      },
      err => console.error(err)
      );
}



async eliminarLikes(){//elimina solo un like
  
  var id_user  =this.usuariosService.getSesionCod();
  await this.productosService.deleteLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
  async res => {
      console.log(res)
    //location.reload();    ///refresco pagina

  
  },
  err => {console.error(err);}
  );
}






crearDislike(){
  delete this.Dislike.id_Dislikes;
  delete this.Dislike.fecha_creacion;
  this.Dislike.fk_usuario =Number(this.usuariosService.getSesionCod());
  this.Dislike.fk_producto=this.id_producto;
      this.productosService.saveDisLike(this.Dislike).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
        res => {
          console.log(res);
        },
        err => console.error(err)
        );
  }


  eliminarDisLikes(){//elimina solo un like
    var id_user  =this.usuariosService.getSesionCod();
    this.productosService.deleteDisLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
    res => {
     // location.reload();    ///refresco pagina
    
    },
    err => {console.error(err);}
    );
  }























existLikes(){//pregunta si existe un like
 var id_user  =this.usuariosService.getSesionCod();
  let respuesta: any=[];
  let numero=0;

  this.productosService.existLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
  async res => {

   respuesta=res;
   console.log(res)
   console.log(respuesta.length);  numero=respuesta.length;
 // this.hayDislikes=true;
  if(numero===0){   console.log('<<<< No hay hay un likes de parte del usuario >>>>>>')
 this.crearlike();
 this. existDislikes22()
//////////////////////////////////////////////////////////
let descripcion ='El usuario realizo un Like ';
let tipo='Like';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
  }else if(numero ===1){    console.log('<<<< Si existe un likes de parte del usuario >>>>>>')
 this.eliminarLikes();
 this. existDislikes22()
//////////////////////////////////////////////////////////
let descripcion ='El usuario quito el like que habia dado';
let tipo='Like';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////


  }    

  

},
 err => {
  console.error(err); }
 );

 setTimeout(( ) =>{     location.reload();       } , 3000);
}

existDisLikes(){//pregunta si existe un like
  var id_user  =this.usuariosService.getSesionCod();
   let respuesta: any=[];
   let numero=0;
 
   this.productosService.existDisLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
   async res => {
 
    respuesta=res;
    console.log(res)
    console.log(respuesta.length);  numero=respuesta.length;
  // this.hayDislikes=true;
   if(numero===0){   console.log('------ No hay hay un Dislike ------')
  this.crearDislike();
  this.existlikes22();
//////////////////////////////////////////////////////////
let descripcion ='El usuario realizo un Dislike (No me Gusta) ';
let tipo='Like';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
   }else if(numero ===1){    console.log('------ Si existe un likes  --------')
  this.eliminarDisLikes();
  this.existlikes22();
  //////////////////////////////////////////////////////////
let descripcion ='El usuario quito el Dislike que habia dado (No Me Gusta)';
let tipo='Like';
let usuario=this.usuariosService.getSesionCod();
this.crearAccion(descripcion,tipo,usuario);
//////////////////////////////////////////////////////////
   }    
 
   
 
 },
  err => {
   console.error(err); }
  );

  setTimeout(( ) =>{     location.reload();       } , 3000);
 }
 


 existDislikes22(){//pregunta si existe un like
  var id_user  =this.usuariosService.getSesionCod();
  let respuesta: any=[];
  let numero=0;

   this.productosService.existDisLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
 res => { 

  respuesta=res;
  console.log(res)
  console.log(respuesta.length);  numero=respuesta.length;

 if(numero===0){   console.log('---- No hay hay un Dislikes de parte del usuario ---')

 }else if(numero ===1){    console.log('--- Si existe un Dislikes de parte del usuario ---')
this.eliminarDisLikes();

 }    

   

   
 },
  err => {
   
   console.error(err); }
  );
 }





 existlikes22(){//pregunta si existe un like
  var id_user  =this.usuariosService.getSesionCod();
  let respuesta: any=[];
  let numero=0;

   this.productosService.existLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
 res => { 

  respuesta=res;
  console.log(res)
  console.log(respuesta.length);  numero=respuesta.length;

 if(numero===0){   console.log('<<<<<<< No hay hay un likes >>>>>>>>>')

 }else if(numero ===1){    console.log('<<<<< Si existe un Likes >>>>>>')
this.eliminarLikes();

 }    

   

   
 },
  err => {
   
   console.error(err); }
  );
 }























  CountLikes(id:string){     //Solo me da Cuantos Likes hay para este producto
    this.productosService.getCountLikes(id).subscribe(  
      res => {
      this.contadorLikes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );
     }



     CountDisLikes(id:string){     //Solo me da Cuantos Likes hay para este producto
      this.productosService.getCountDislikes(id).subscribe(  
        res => {
        this.contadorDisLikes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
        },
        err => console.error(err)
        );
       }













///////////////////////guardo acciones para la Bitacora
crearAccion(descripcion:string, tipo:string, usuario:string){   
  this.productosService.saveAccion(descripcion,tipo,usuario)
  .subscribe(
  res=> {     console.log('accion registrada en bitacora')      },
  err=>{                                                        })
}








}
