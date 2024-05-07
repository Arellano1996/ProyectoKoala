import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/paginas/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
  {
    path: '404',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
