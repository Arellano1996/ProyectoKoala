import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancionesRoutingModule } from './canciones-routing.module';
import { CancionComponent } from './cancion/cancion.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';
import { MenuDespleglableComponent } from './indice/menu-despleglable/menu-despleglable.component';


@NgModule({
  declarations: [
    CancionComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent,
    MenuDespleglableComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule
  ]
})
export class CancionesModule { }
