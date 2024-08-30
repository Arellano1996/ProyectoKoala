import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styles: ``
})
export class RegistrarseComponent {

  fb = inject(FormBuilder) // formulario

  public formularioRegistrarse: FormGroup = this.fb.group({
    correo: ['', [ Validators.required, Validators.minLength(1) ], []],
    usuario: ['', [ Validators.required, Validators.minLength(1) ], []],
    contraseña: ['', [ Validators.required, Validators.minLength(1) ], []],
    confirmarcontraseña: ['', [ Validators.required, Validators.minLength(1) ], []]

  })
  onSubmit(){

  }

}
