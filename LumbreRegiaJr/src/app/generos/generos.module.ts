import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerosRoutingModule } from './generos-routing.module';
import { GeneroComponent } from './genero/genero.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';


@NgModule({
  declarations: [
    GeneroComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent
  ],
  imports: [
    CommonModule,
    GenerosRoutingModule
  ]
})
export class GenerosModule { }
