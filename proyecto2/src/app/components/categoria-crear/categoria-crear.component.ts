import { Component, OnInit, HostBinding  } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router'; /// sierve para cuando guarde me redireccione a la vista games
import { Categoria } from 'src/app/modelos/Categoria';   //importo el tipo de dato,
import {ProductoService} from '../../servicios/producto.service'; ///importo el servicio
import {UsuariosService} from '../../servicios/usuarios.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.component.html',
  styleUrls: ['./categoria-crear.component.css']
})
export class CategoriaCrearComponent implements OnInit {


  @HostBinding('class') classes='row';  //necesario para desplegar un producto a la par de otro 

  public error=false; 
  public exito=false; 

   categorias: any=[];

  categoria: Categoria ={  
    id_categoria: 0,
    categoria: ''
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


   ///mando a llamar las categorias del sistema
   this.getCategorias();


}



onDenunciar(form:NgForm){
  // console.log( form);
 if(form.valid){
 this.saveNewCategoria();

 }else{
   this.mensaje_error();


}
 
 }   



 menasje_exito(){
  this.exito=true; 
  setTimeout(( ) =>{this.exito= false;}   ,   4000);
}
mensaje_error(){
  this.error=true; 
  setTimeout(( ) =>{this.error= false;}   ,   4000);
}





 saveNewCategoria(){

  delete this.categoria.id_categoria;
  console.log(this.categoria);

  this.productosService.saveCategoria(this.categoria)
    .subscribe(
      res=> {
        console.log(res);

        this.menasje_exito();

        setTimeout(( ) =>{location.reload();}   ,   5000);
        
        
      },
      err=> console.error(err)

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
