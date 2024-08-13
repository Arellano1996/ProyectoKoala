import { Component, inject, OnInit } from '@angular/core';
import { CrearCancion, Lineas, MenuCrearCancion, PalabrasCrearCancion } from '../interfaces/crear.cancion.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeEmergenteService } from '../../shared/mensaje-emergente/mensaje-emergente.service';
import { NotificationType } from '../../shared/mensaje-emergente/interfaces/mensaje-alerta.interfaces';
//import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {
  
  public formularioCrearCancion: FormGroup = this.fb.group({
    Letra: ['', [ Validators.required, Validators.minLength(1) ], []]
  })
  
  //private notificationService = inject(MensajeEmergenteService);
  //HoverButtons = 'hover:text-blue-400'
  posicionMenu: number = 0;
  
  //Esta variable sirve para mantener mi objeto durante la creación
  cancion: CrearCancion = { Lineas: [], Tamanio: '1rem' };
  
  constructor(private fb: FormBuilder,) { }
  
  //Metodo es llamado desde el elemento menu-crear-cancion
  recibirPosicionMenu(index: number){
    this.posicionMenu = index;
  }

  //Metodo es llamado desde el elemnto textarea-letra-crear-cancion
  recibirCancion(cancion: CrearCancion){
    this.cancion = cancion
  }

  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioCrearCancion.controls[field].errors 
    && this.formularioCrearCancion.controls[field].touched
  }
  
  //Método al hacer submit a nuestro formulario
  onSave(){
    console.log(this.cancion)
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioCrearCancion.invalid ) {
      this.formularioCrearCancion.markAllAsTouched()
      return
    }
  }
  

  
}
