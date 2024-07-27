import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetrasRoutingModule } from './letras-routing.module';
import { LetraComponent } from './letra/letra.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';


@NgModule({
  declarations: [
    LetraComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent
  ],
  imports: [
    CommonModule,
    LetrasRoutingModule
  ]
})
export class LetrasModule { }
