import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';



@NgModule({
  declarations: [IniciarSesionComponent],
  imports: [
    CommonModule,
    IniciarSesionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IniciarSesionModule { }
