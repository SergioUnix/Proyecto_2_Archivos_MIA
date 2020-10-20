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

  public ref_publi=0;

  id_producto=0;





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
       this.eliminarDisLikes();
}
eliminarLikes(){//elimina solo un like
  
  var id_user  =this.usuariosService.getSesionCod();
  this.productosService.deleteLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
  res => {
   
    location.reload();    ///refresco pagina

  
  },
  err => {console.error(err);}
  );
}




//existLikes(){//pregunta si existe un like
 // var id_user  =this.usuariosService.getSesionCod();
//  this.productosService.existLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
//  res => {
 // this.haylikes=true;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
  
//},
 // err => {console.error(err); }
 // );
//}

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
        this.eliminarLikes();

  }
  eliminarDisLikes(){//elimina solo un like
    var id_user  =this.usuariosService.getSesionCod();
    this.productosService.deleteDisLike(id_user,this.id_producto.toString()).subscribe(  //si el arregloComodinLikes esta vacio es porque no hay like
    res => {
      location.reload();    ///refresco pagina
    
    },
    err => {console.error(err);}
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

}
