import { Component } from '@angular/core';
import { CrearLetraCancion } from '../interfaces/crear.cancion.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancionesService } from '../services/canciones.service';
import { CrearCancion } from '../interfaces/canciones.interfaces';
import { FormatearLetraService } from '../services/formatear-letra.service';
//import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {
  
  public formularioCrearCancion: FormGroup = this.fb.group({
    CancionNombre: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionTonoOriginal: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionDuracion: ['', [ Validators.required, Validators.minLength(1) ], []],
    Artistas: [0, [ Validators.required, Validators.min(1) ], []],
    Generos: [0, [ Validators.required, Validators.min(1) ], []],
    Letra: ['', [ Validators.required, Validators.minLength(1) ], []],
    Links: ['', [ Validators.required, Validators.minLength(1) ], []],
    Baterias: ['', [ Validators.required, Validators.minLength(1) ], []]
  })
  
  //private notificationService = inject(MensajeEmergenteService);
  //HoverButtons = 'hover:text-blue-400'
  posicionMenu: number = 0;
  
  //Esta variable sirve para mantener mi objeto durante la creación
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem' };
  
  constructor(private fb: FormBuilder,
    private cancionService: CancionesService,
    private formatearLetraService: FormatearLetraService
  ) { }
  
  //Metodo es llamado desde el elemento menu-crear-cancion
  recibirPosicionMenu(index: number){
    this.posicionMenu = index;
  }

  //Metodo es llamado desde el elemnto textarea-letra-crear-cancion
  recibirCancion(cancion: CrearLetraCancion){
    this.cancion = cancion
  }

  seAgregoArtistaDesdeHijo(valor: number){
    this.formularioCrearCancion.controls['Artistas'].patchValue(valor)
  }

  seAgregoGeneroDesdeHijo(valor: number){
    this.formularioCrearCancion.controls['Generos'].patchValue(valor)
  }

  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioCrearCancion.controls[field].errors 
    && this.formularioCrearCancion.controls[field].touched
  }
  
  //Método al hacer submit a nuestro formulario
  onSave(){

    if(this.cancion.Lineas.length > 0){
      const cancionSerializada = JSON.stringify(this.cancion)
      this.formularioCrearCancion.controls['Letra'].patchValue( cancionSerializada )
      console.log(cancionSerializada)
    }
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioCrearCancion.invalid ) {
      this.formularioCrearCancion.markAllAsTouched()
      return
    }

    let nuevaCancion: CrearCancion = {
      UsuarioId: 'b5fbda91-bbb2-4e79-82fb-9b4e6e2ad2ba',
      Nombre: '',
      Tono: '',
      Duracion: '',
      Letras: [],//Para crear una canción, el arreglo solo tiene una letra
      Artistas: [],
      Generos: [],
      Links: [],
      Baterias: []
    }

    console.log( nuevaCancion )
    // this.cancionService.postCrearCancion().subscribe(res => {
    //   console.log(res)
    // })
  
  }
  

  
}
