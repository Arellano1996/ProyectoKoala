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
import { PalabraComponent } from './crear/div-agregar-acordes-crear-cancion/palabra/palabra.component';
import { ToolTipAcordesComponent } from './crear/div-agregar-acordes-crear-cancion/div-grupo-acordes/div-grupo-acordes.component';
import { LinksComponent } from './crear/links/links.component';
import { BateriaComponent } from './crear/bateria/bateria.component';
import { ArtistasCrearCancionComponent } from './crear/artistas/artistas.crear.cancion.component';
import { GenerosCrearCancionComponent } from './crear/generos/generos.crear.cancion.component';


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
    DivAgregarAcordesCrearCancionComponent,
    PalabraComponent,
    ToolTipAcordesComponent,
    LinksComponent,
    BateriaComponent,
    ArtistasCrearCancionComponent,
    GenerosCrearCancionComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CancionesModule { }
