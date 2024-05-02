import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './paginas/error404/error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error404Component
  ]
})
export class SharedModule { }
