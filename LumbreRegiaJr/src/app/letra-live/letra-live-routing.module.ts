import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetraLiveComponent } from './letra-live.component';

const routes: Routes = [
  {
    path: '',
    component: LetraLiveComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LetraLiveRoutingModule { }
