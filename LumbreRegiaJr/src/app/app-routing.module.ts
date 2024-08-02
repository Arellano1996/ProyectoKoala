import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
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
        path: 'canciones',
        loadChildren: () => import('./canciones/canciones.module').then(m => m.CancionesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(u => u.UsuariosModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./usuario/usuario.module').then(u => u.UsuarioModule)
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
