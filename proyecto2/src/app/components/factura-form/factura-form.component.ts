import { Component, OnInit, HostBinding } from '@angular/core';
//import { AsigEstuService} from 'src/app/servicios/asig-estu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {
  @HostBinding('class') classes='row';  //necesario para desplegar un juego a la par de otro 
  public admin_funcion = false;
  public cliente_funcion = false;

  public usuario_activo='';
  public buscar='';

  public oculto=false;


  public isExito=false; 

  //usuarios de todo el sistema
  TodosLosproductos: any=[];

  ///productos
  productos: any=[];
  public API_URI='http://localhost:3000/';

  filterPost ='';

  public id_usuario_logueado;



  constructor(private usuariosService:UsuariosService,private productosService:ProductoService, private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
       // Obtengo los privilegios segun el tipo de rol
       this.onCheckUser();
       //metodo que verifica si hay usuario logueado
     this.loginExist();

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
