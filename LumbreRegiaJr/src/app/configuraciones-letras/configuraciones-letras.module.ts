import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionesLetrasRoutingModule } from './configuraciones-letras-routing.module';
import { ConfiguracionLetraComponent } from './configuracion-letra/configuracion-letra.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';


@NgModule({
  declarations: [
    ConfiguracionLetraComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionesLetrasRoutingModule
  ]
})
export class ConfiguracionesLetrasModule { }
