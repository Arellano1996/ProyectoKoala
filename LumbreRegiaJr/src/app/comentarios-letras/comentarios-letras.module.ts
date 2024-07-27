import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComentariosLetrasRoutingModule } from './comentarios-letras-routing.module';
import { ComentarioLetraComponent } from './comentario-letra/comentario-letra.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';


@NgModule({
  declarations: [
    ComentarioLetraComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent
  ],
  imports: [
    CommonModule,
    ComentariosLetrasRoutingModule
  ]
})
export class ComentariosLetrasModule { }
