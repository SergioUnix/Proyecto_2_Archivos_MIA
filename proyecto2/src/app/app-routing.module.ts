import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'; //importamos componentes
import {PerfilComponent} from './components/perfil/perfil.component';
import {ProductoCrearComponent} from './components/producto-crear/producto-crear.component';

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
    path: 'productos/modificar/:id',
    component: ProductoCrearComponent
    }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
