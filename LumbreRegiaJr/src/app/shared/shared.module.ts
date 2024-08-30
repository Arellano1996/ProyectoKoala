import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { MensajeEmergenteComponent } from './mensaje-emergente/mensaje-emergente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    Error404Component,
    MensajeEmergenteComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    Error404Component,
    NavbarComponent,
    MensajeEmergenteComponent,
    RouterModule,
  ]
})
export class SharedModule { }
