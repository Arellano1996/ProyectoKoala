import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceComponent } from './indice/indice.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'editar',
    component: EditarComponent
  },
  {
    path: '',
    component: IndiceComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistasRoutingModule { }
