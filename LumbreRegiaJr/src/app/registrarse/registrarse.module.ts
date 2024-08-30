import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarseComponent } from './registrarse.component';
import { RegistrarseRoutingModule } from './registrarse-routing.module';



@NgModule({
  declarations: [
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    RegistrarseRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistrarseModule { }
