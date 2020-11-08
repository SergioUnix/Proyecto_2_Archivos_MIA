import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'; //importamos componentes
import {PerfilComponent} from './components/perfil/perfil.component';
import {ProductoCrearComponent} from './components/producto-crear/producto-crear.component';
import {ProductoMioComponent} from './components/producto-mio/producto-mio.component';
import {DetalleComponent} from './components/detalle/detalle.component';
import {DenunciaCrearComponent} from './components/denuncia-crear/denuncia-crear.component';
import {ChatComponent} from './components/chat/chat.component';
import {RegistroClienteComponent} from './components/registro-cliente/registro-cliente.component';
import {ConfirmarEmailComponent} from './components/confirmar-email/confirmar-email.component';
import {SetearPassComponent} from './components/setear-pass/setear-pass.component';
import {PerfilUpdateComponent} from './components/perfil-update/perfil-update.component';
import {CarritoListaComponent} from './components/carrito-lista/carrito-lista.component';
import {DenunciaListComponent} from './components/denuncia-list/denuncia-list.component';
import {CategoriaCrearComponent} from './components/categoria-crear/categoria-crear.component';
import {ChatAdminComponent} from './components/chat-admin/chat-admin.component';
import {ReporteComponent} from './components/reporte/reporte.component';




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
  },
  {
  path: 'registro-cliente',
  component: RegistroClienteComponent
  },
  {
  path: 'confirmar/:correo/:contrasenia/:nombre/:apellido',
  component: ConfirmarEmailComponent
  },
  {
  path: 'setear/pass/:correo/:contrasenia/:nombre/:apellido',
  component: SetearPassComponent
  },
  {
  path: 'update/:id',
  component: PerfilUpdateComponent
  },
  {
  path: 'carrito/:id',
  component: CarritoListaComponent
  },
  {
  path: 'denuncias',
  component: DenunciaListComponent
  },
  {
  path: 'categoria-crear',
  component: CategoriaCrearComponent
  },
  {
  path: 'chat-admin',
  component: ChatAdminComponent
  },
  {
  path: 'reporte/:id',
  component: ReporteComponent
  }
  
  
  
  
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
