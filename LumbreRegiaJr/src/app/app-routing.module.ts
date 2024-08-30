import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { InicioComponent } from './inicio/inicio.component';
import { estaAutentificadoGuard } from './iniciar-sesion/guards/estaAutentificado.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ estaAutentificadoGuard ],
    component: InicioComponent,
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule),
    // pathMatch: 'full'
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then(m => m.RegistrarseModule)
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
