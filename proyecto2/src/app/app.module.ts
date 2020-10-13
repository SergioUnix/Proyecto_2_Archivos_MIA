import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';//tambien se necesita importa HttpClientModule
import {FormsModule} from '@angular/forms';  //necesario para lanzar mis datos por medio de [NGModel]

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';


import {UsuariosService} from './servicios/usuarios.service';
import {ProductoService} from './servicios/producto.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component'; /// instancio el servicio

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    PerfilComponent,
    ProductoCrearComponent






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,         //escribo aca el httpClientModule
    FormsModule,             //necesario ponerlo para enlazar datos con el objeto creado tipo interfaz
    AppRoutingModule
  ],
  providers: [
    UsuariosService,  /// permite poder tener los metodos para pedir datos
    ProductoService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
