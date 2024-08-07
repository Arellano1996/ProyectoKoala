import { Component, inject } from '@angular/core';
import { CrearCancion } from '../interfaces/crear.cancion.interfaces';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeEmergenteService } from '../../shared/mensaje-emergente/mensaje-emergente.service';
import { NotificationType } from '../../shared/mensaje-emergente/interfaces/mensaje-alerta.interfaces';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {

  private notificationService = inject(MensajeEmergenteService);
  HoverButtons = 'hover:text-blue-400'
  menuCrearCancion: CrearCancion;

  public formularioCrearCancion: FormGroup = this.fb.group({
    //valor inicial, validador sinconos, valor asyncronos
    Letra: ['', [
      Validators.required,
      Validators.minLength(1)
    ], []]
  })

  constructor(private fb: FormBuilder,) {
    this.menuCrearCancion = {
      opcion: 0
    }
  }

  seleccionarOpcion(opcion: number){
    this.menuCrearCancion.opcion = opcion
  }

  isValidField( field: string ): boolean | null {
    return this.formularioCrearCancion.controls[field].errors 
    && this.formularioCrearCancion.controls[field].touched
  }
  
  onSave(){
    this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioCrearCancion.invalid ) {
      this.formularioCrearCancion.markAllAsTouched()
      return
    }
  }
}
