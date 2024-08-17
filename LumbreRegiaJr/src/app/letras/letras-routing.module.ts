import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { LetraComponent } from './letra/letra.component';
import { IndiceComponent } from './indice/indice.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crear',
        component: CrearComponent
      },
      {
        path: 'editar/:id',
        component: EditarComponent
      },
      {
        path: ':id',
        component: LetraComponent
      },
      {
        path: '',
        component: IndiceComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LetrasRoutingModule { }
