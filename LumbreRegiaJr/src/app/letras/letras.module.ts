import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetrasRoutingModule } from './letras-routing.module';
import { LetraComponent } from './letra/letra.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndiceComponent } from './indice/indice.component';
import { MenuComponent } from './letra/menu/menu.component';
import { MenuDesplegableComponent } from './letra/menu-desplegable/menu-desplegable.component';
import { PalabraComponent } from './letra/palabra/palabra.component';
import { GrupoAcordesComponent } from './letra/grupo-acordes/grupo-acordes.component';


@NgModule({
  declarations: [
    LetraComponent,
    CrearComponent,
    EditarComponent,
    IndiceComponent,
    MenuComponent,
    MenuDesplegableComponent,
    PalabraComponent,
    GrupoAcordesComponent
  ],
  imports: [
    CommonModule,
    LetrasRoutingModule
  ]
})
export class LetrasModule { }
