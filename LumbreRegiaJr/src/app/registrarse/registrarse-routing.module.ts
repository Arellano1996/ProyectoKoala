import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RegistrarseComponent } from "./registrarse.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: RegistrarseComponent,
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistrarseRoutingModule { }