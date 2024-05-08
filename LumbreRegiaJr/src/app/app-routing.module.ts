import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AppComponent } from './app.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'iniciar-sesion',
        component: IniciarSesionComponent
      },
      {
        path: 'registrarse',
        component: RegistrarseComponent
      },
      {
        path: 'artistas',
        loadChildren: () => import('./artistas/artistas.module').then(m => m.ArtistasModule)
      },
      {
        path: '',
        component: InicioComponent,
        pathMatch: 'full'
      }
    ]
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
