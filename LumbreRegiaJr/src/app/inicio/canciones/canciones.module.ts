import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancionesRoutingModule } from './canciones-routing.module';
import { CrearComponent } from './crear/crear.component';


@NgModule({
  declarations: [
    CrearComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule
  ]
})
export class CancionesModule { }
