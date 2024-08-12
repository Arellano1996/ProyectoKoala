import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancionesRoutingModule } from './canciones-routing.module';
import { CancionComponent } from './cancion/cancion.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';
import { MenuDespleglableComponent } from './indice/menu-despleglable/menu-despleglable.component';
import { BuscarComponent } from './indice/buscar/buscar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuCrearCancionComponent } from './crear/menu-crear-cancion/menu-crear-cancion.component';
import { TextareaLetraCrearCancionComponent } from './crear/textarea-letra-crear-cancion/textarea-letra-crear-cancion.component';
import { DivAgregarAcordesCrearCancionComponent } from './crear/div-agregar-acordes-crear-cancion/div-agregar-acordes-crear-cancion.component';


@NgModule({
  declarations: [
    CancionComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent,
    MenuDespleglableComponent,
    BuscarComponent,
    MenuCrearCancionComponent,
    TextareaLetraCrearCancionComponent,
    DivAgregarAcordesCrearCancionComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CancionesModule { }
