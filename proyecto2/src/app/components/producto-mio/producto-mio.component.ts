import { Component, OnInit, HostBinding } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-producto-mio',
  templateUrl: './producto-mio.component.html',
  styleUrls: ['./producto-mio.component.css']
})
export class ProductoMioComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un juego a la par de otro 
  public admin_funcion = false;
  public cliente_funcion = false;
 
  public usuario_activo='';
  public buscar='';




  public isExito=false; 

  ///productos
  productos: any=[];
  public API_URI='';


  filterPost ='';


  constructor(private usuariosService:UsuariosService,private productosService:ProductoService, private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  //// setear la variable del serverDir  , esto se hace para la aplicacion Android ...
  this.API_URI=this.usuariosService.getServerDir()+'/';







       // Obtengo los privilegios segun el tipo de rol
  this.onCheckUser();
    //metodo que verifica si hay usuario logueado
  this.loginExist();
  //mando a llamar productos que no fueron creados por el usuario logueado
  this.productosVecinos();

  



      }


      Visualizar_Exito(){
        this.isExito=true; 
        setTimeout(( ) =>{this.isExito= false;}   ,   3000);
      }
      
















     productosVecinos(){    //mando a llamar productos que no fueron creados por el usuario logueado
      let  id= this.usuariosService.getSesionCod();
      this.productosService.getProductosMIO(id).subscribe(  /// 
        res => {
          this.productos = res;///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
         },
        err => console.error(err)
      );
       }





















  loginExist(){
    ///si no esta logueado redirecciona a login
    if(this.usuariosService.getSesionNombre()==''){
    this.router.navigate(['/login']);    
   }}


  /// Privilegios segun el tipo de Usuario
  onCheckUser(): void {
    if (this.usuariosService.getSesionTipo()=='1') {
      this.admin_funcion = true; 
      this.cliente_funcion=true;
      
    } else if(this.usuariosService.getSesionTipo()=='2') {
      this.admin_funcion = true; 
      this.cliente_funcion=true;
      
    }}



 
}
