import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IniciarSesionComponent } from "./iniciar-sesion.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: IniciarSesionComponent,
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IniciarSesionRoutingModule { }