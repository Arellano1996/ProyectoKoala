import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { MensajeEmergenteComponent } from './mensaje-emergente/mensaje-emergente.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    Error404Component,
    MensajeEmergenteComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error404Component
  ]
})
export class SharedModule { }
