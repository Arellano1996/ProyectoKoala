import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { LetraComponent } from '../letras/letra/letra.component';
import { LetraLiveComponent } from '../letra-live/letra-live.component';


@NgModule({
  declarations: [
    InicioComponent,
    LetraLiveComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
