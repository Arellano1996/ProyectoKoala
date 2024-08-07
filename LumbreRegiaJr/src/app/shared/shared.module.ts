import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { MensajeEmergenteComponent } from './mensaje-emergente/mensaje-emergente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    Error404Component,
    MensajeEmergenteComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    Error404Component,
    NavbarComponent,
    MensajeEmergenteComponent
  ]
})
export class SharedModule { }
