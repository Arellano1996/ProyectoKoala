import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutentificacionService } from './services/autentificacion.service';
import { catchError, map, of, tap } from 'rxjs';
import { MensajeEmergenteService } from '../shared/mensaje-emergente/mensaje-emergente.service';
import { NotificationType } from '../shared/mensaje-emergente/interfaces/mensaje-alerta.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
})
export class IniciarSesionComponent {

  fb = inject(FormBuilder) // formulario
  mensajeEmergenteService = inject(MensajeEmergenteService)
  autentificacionServicio = inject(AutentificacionService)
  router = inject(Router)

  public formularioIniciarSesion: FormGroup = this.fb.group({
    Correo: ['', [ Validators.required, Validators.email ,Validators.minLength(1) ], []],
    Contrasena: ['', [ Validators.required, Validators.minLength(4) ], []]

  })
  
  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioIniciarSesion.controls[field].errors 
    && this.formularioIniciarSesion.controls[field].touched
  }
  
  onSubmit(){
    if(!this.formularioIniciarSesion) return

    const {Correo, Contrasena } = this.formularioIniciarSesion.value

    console.log( this.formularioIniciarSesion )

    
    this.autentificacionServicio.iniciarSesion({ Correo, Contrasena })
    .subscribe({
      next: () => {
        this.router.navigate([ '' ])
      },
      error: (mensaje) => {
        //TODO Mostrar mensaje de error
        this.mensajeEmergenteService.showAlert(NotificationType.Error, mensaje)
        console.log(mensaje)
      }
    })
    
  }


}
