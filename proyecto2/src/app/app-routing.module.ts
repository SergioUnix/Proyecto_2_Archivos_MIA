import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'; //importamos componentes
import {PerfilComponent} from './components/perfil/perfil.component';
import {ProductoCrearComponent} from './components/producto-crear/producto-crear.component';
import {ProductoMioComponent} from './components/producto-mio/producto-mio.component';
import {DetalleComponent} from './components/detalle/detalle.component';
import {DenunciaCrearComponent} from './components/denuncia-crear/denuncia-crear.component';
import {ChatComponent} from './components/chat/chat.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
  path: 'productos/agregar',
  component: ProductoCrearComponent
    
  },
  {
  path: 'perfil/productos/modificar/:id',  //modificar producto desde el perfil
  component: ProductoCrearComponent
  },
  {
  path: 'productos/mio/productos/modificar/:id', //modificar producto desde producto-mio
  component: ProductoCrearComponent
  },
  {
  path: 'productos/mio',
  component: ProductoMioComponent      
  },
  {
  path: 'detalle/:id',
  component: DetalleComponent     
  },
  {
  path: 'denuncia/:id',
  component: DenunciaCrearComponent     
  },
  {
  path: 'chat/:id',
  component: ChatComponent    
  }
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
