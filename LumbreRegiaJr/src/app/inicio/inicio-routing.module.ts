import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {
    path: 'canciones',
    loadChildren: () => import('./canciones/canciones.module').then(m => m.CancionesModule)
  },
  // {
  //   path: 'canciones',
  //   loadChildren: () => import('./canciones/canciones.module').then(m => m.CancionesModule)
  // },
  {
    path: '',
    component: InicioComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
