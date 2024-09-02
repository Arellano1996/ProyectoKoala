import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetraLiveRoutingModule } from './letra-live-routing.module';
import { LetraLiveComponent } from './letra-live.component';
import { PalabraLetraLiveComponent } from './palabra/palabra.component';
import { GrupoAcordesLetraLiveComponent } from './grupo-acordes/grupo-acordes.component';
import { MenuDesplegableComponent } from '../letras/letra/menu-desplegable/menu-desplegable.component';
import { LetrasModule } from '../letras/letras.module';


@NgModule({
  declarations: [
    LetraLiveComponent,
    PalabraLetraLiveComponent,
    GrupoAcordesLetraLiveComponent,
  ],
  imports: [
    CommonModule,
    LetraLiveRoutingModule,
    LetrasModule
  ]
})
export class LetraLiveModule { }
