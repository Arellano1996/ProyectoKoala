import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistasRoutingModule } from './artistas-routing.module';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';
import { ArtistaComponent } from './artista/artista.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearComponent,
    EditarComponent,
    IndiceComponent,
    ArtistaComponent
  ],
  imports: [
    CommonModule,
    ArtistasRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArtistasModule { }
