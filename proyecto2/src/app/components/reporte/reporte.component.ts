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
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 
 
  public reporte1 = false;
  public reporte2 = false;
  public reporte3 = false;
  public reporte4 = false;
  public reporte5 = false;
  public reporte6 = false;
  public reporte7 = false;
  public reporte8 = false;
  public reporte9 = false;
  public reporte10 = false;



  arreglo: any=[];
 
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


  constructor (private usuariosService: UsuariosService,private productosService: ProductoService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    //sino esta logueado me redirecciona al login
    if(this.usuariosService.getSesionNombre()==''){    console.log("No Logeado --productos-lista");    this.router.navigate(['/login']); }






    const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
    
    if(params.id==1){    
      this.getReporte1();
    }else if(params.id==2){
      this.getReporte2();
    }else if(params.id==3){
      this.getReporte3();
    }else if(params.id==4){
      this.getReporte4();
    }else if(params.id==5){
      this.getReporte5();
    }else if(params.id==6){
      this.getReporte6();
    }else if(params.id==7){
      this.getReporte7();
    }else if(params.id==8){
      this.getReporte8();
    }

    
   }


  
   




  }


  getReporte1Descendente(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte1Descendente().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte1=true;
      //  setTimeout(( ) =>{     location.reload();       } , 2000);
       },
      err => console.error(err)
    );
     }







  getReporte1(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte1().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte1=true;
        //setTimeout(( ) =>{     location.reload();       } , 2000);
       },
      err => console.error(err)
    );
     }


  getReporte2(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte2().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte2=true;
      
       },
      err => console.error(err)
    );
     }



  getReporte3(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte3().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte3=true;
      
       },
      err => console.error(err)
    );
     }

  getReporte4(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte4().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte4=true;
      
       },
      err => console.error(err)
    );
     }

     

  getReporte5(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte5().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte5=true;
      
       },
      err => console.error(err)
    );
     }


 getReporte6(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte6().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte6=true;
      
       },
      err => console.error(err)
    );
     }



 getReporte7(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte7().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte7=true;
      
       },
      err => console.error(err)
    );
     }

 getReporte8(){    
    let  id= this.usuariosService.getSesionCod();
    this.productosService.getReporte8().subscribe(  
      res => {
        this.arreglo = res;
        this.reporte8=true;
      
       },
      err => console.error(err)
    );
     }




//refrescar la pagina

refrescar(){
  location.reload();

}




}
