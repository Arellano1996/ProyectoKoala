import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { LayoutPageComponent } from './paginas/layout-page/layout-page.component';
import { RegistroComponent } from './paginas/registro/registro.component';

@NgModule({
  declarations: [
    IniciarSesionComponent,
    LayoutPageComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule
  ]
})
export class AutentificacionModule { }
