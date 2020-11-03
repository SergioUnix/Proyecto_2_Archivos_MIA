import { Component } from '@angular/core';
import {UsuariosService} from './servicios/usuarios.service';
import { Plugins } from '@capacitor/core'; ///importo el servicio



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto2';
  public isLogged = true;



    
mostrarMenu:boolean =false;
constructor(private usuariosService:UsuariosService ){}


ngOnInit() { 
/// chequea si hay alguien logueado y permite visualizar el componente navigation por medio de una variable booleana
this.onCheckUser();


}

 onCheckUser(): void {
    if (this.usuariosService.getSesionNombre()=='') {
      this.isLogged = false;    
    } else {
      this.isLogged = true; }}
}
