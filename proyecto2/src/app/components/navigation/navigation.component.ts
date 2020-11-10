import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';   //importo el tipo de dato,


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  public admin_funcion = false;
  public cliente_funcion = false;
  public usuario_activo='';
  public buscar='';

  id_usuario=0;


 usuario_logueado_objeto: Usuario ={
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




  constructor(private usuariosService:UsuariosService, private router: Router) { }

  ngOnInit() {
   // Obtengo los privilegios segun el tipo de rol
   this.onCheckUser();
   //Obtengo el nombre del Usuario Logueado
   this.usuario_activo=this.usuariosService.getSesionNombre();


   console.log('Cod Rol del Usuario = ');
   console.log(this.usuariosService.getSesionTipo());
   console.log('Nombres del Usuario logueado = ');
   console.log(this.usuariosService.getSesionNombre());
   //console.log('Id_usuario = ');
   this.usuario_logueado_objeto=this.usuariosService.getSesionObjeto();

   console.log('El server es:')
   console.log(this.usuariosService.getServerDir());







   


  }







  /// Privilegios segun el tipo de Usuario
  onCheckUser(): void {
    if (this.usuariosService.getSesionTipo()=='1') {
      this.admin_funcion = true; 
      this.cliente_funcion=true;
   
    } else if(this.usuariosService.getSesionTipo()=='2') {
      this.admin_funcion = false; 
      this.cliente_funcion=true;
        
    }else if(this.usuariosService.getSesionTipo()==''){
      this.router.navigate(['/login']);
    }
  
  }


 
 ///Salir de la sesión
  logOut(){
    this.usuariosService.OutSesion();

    this.router.navigate(['/login']);
    location.reload();
    }









}
