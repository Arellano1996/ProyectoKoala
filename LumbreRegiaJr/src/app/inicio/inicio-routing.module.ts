import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  
  
      {
        path: 'artistas',
        loadChildren: () => import('../artistas/artistas.module').then(m => m.ArtistasModule)
      },
      {
        path: 'canciones',
        loadChildren: () => import('../canciones/canciones.module').then(m => m.CancionesModule)
      },
      {
        path: 'letras',
        loadChildren: () => import('../letras/letras.module').then(l => l.LetrasModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then(u => u.UsuariosModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../usuario/usuario.module').then(u => u.UsuarioModule)
      }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
