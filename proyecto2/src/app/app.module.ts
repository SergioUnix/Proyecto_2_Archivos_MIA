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
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component';
import { ProductoMioComponent } from './components/producto-mio/producto-mio.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { DenunciaCrearComponent } from './components/denuncia-crear/denuncia-crear.component';
import { ChatComponent } from './components/chat/chat.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { ConfirmarEmailComponent } from './components/confirmar-email/confirmar-email.component';
import { RecuperarPassComponent } from './components/recuperar-pass/recuperar-pass.component';
import { SetearPassComponent } from './components/setear-pass/setear-pass.component';
import { CategoriaCrearComponent } from './components/categoria-crear/categoria-crear.component';
import { DenunciaListComponent } from './components/denuncia-list/denuncia-list.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { CarritoListaComponent } from './components/carrito-lista/carrito-lista.component';
import { FacturaFormComponent } from './components/factura-form/factura-form.component';
import { PerfilUpdateComponent } from './components/perfil-update/perfil-update.component';
import { FilterPipe2 } from './pipes/filtro2.pipe'; /// instancio el servicio


////importo pipes



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    PerfilComponent,
    ProductoCrearComponent,
    ProductoMioComponent,
    DetalleComponent,
    DenunciaCrearComponent,
    ChatComponent,
    FilterPipe,
    RegistroClienteComponent,
    ConfirmarEmailComponent,
    RecuperarPassComponent,
    SetearPassComponent,
    CategoriaCrearComponent,
    DenunciaListComponent,
    BitacoraComponent,
    CarritoListaComponent,
    FacturaFormComponent,
    PerfilUpdateComponent,
    FilterPipe2,
  






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
