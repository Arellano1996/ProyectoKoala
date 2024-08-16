import { Component } from '@angular/core';
import { CrearLetraCancion } from '../interfaces/crear.cancion.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancionesService } from '../services/canciones.service';
import { CrearCancion } from '../interfaces/canciones.interfaces';
import { FormatearLetraService } from '../services/formatear-letra.service';
import { CrearCancionLetra } from '../../letras/interfaces/letras.interfaces';
import { CrearArtista } from '../../artistas/interfaces/artistas.interface';
import { CrearGenero } from '../../generos/interfaces/generos.interfaces';
import { Route, Router } from '@angular/router';
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
    CancionBPM: ['', []],
    Artistas: [0, [ Validators.required, Validators.min(1) ], []],
    Generos: [0, [ Validators.required, Validators.min(1) ], []],
    Letra: ['', []],
    Links: ['', []],
    Baterias: ['', []]
  })
  
  //private notificationService = inject(MensajeEmergenteService);
  //HoverButtons = 'hover:text-blue-400'
  posicionMenu: number = 0;
  
  //Esta variable sirve para mantener mi objeto durante la creación
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' };
  artistas: CrearArtista[] = []
  generos: CrearGenero[] = []
  
  constructor(private fb: FormBuilder,
    private cancionService: CancionesService,
    private router: Router
  ) { }
  
  //Metodo es llamado desde el elemento menu-crear-cancion
  recibirPosicionMenu(index: number){
    this.posicionMenu = index;
  }

  //Metodo es llamado desde el elemnto textarea-letra-crear-cancion
  recibirCancion(cancion: CrearLetraCancion){
    this.cancion = cancion
  }

  seAgregoArtistaDesdeHijo(artistas: string[]){
    this.formularioCrearCancion.controls['Artistas'].patchValue(artistas.length)
    this.artistas = artistas.map(artista => {
      return {
        Nombre: artista
      }
    })
  }

  seAgregoGeneroDesdeHijo(generos: string[]){
    this.formularioCrearCancion.controls['Generos'].patchValue(generos.length)
    this.generos = generos.map( genero => {
      return {
        Nombre: genero
      }
    })
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
    }
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioCrearCancion.invalid ) {
      console.log
      this.formularioCrearCancion.markAllAsTouched()
      return
    }
    
    const letra: CrearCancionLetra = {
      Letra: this.formularioCrearCancion.controls['Letra'].value,
      Tono: this.cancion.Tono
    }


    let nuevaCancion: CrearCancion = {
      UsuarioId: 'e26ccc45-caf4-4407-b7c0-a02705eb6cc9',
      Nombre: this.formularioCrearCancion.controls['CancionNombre'].value,
      Tono: this.formularioCrearCancion.controls['CancionTonoOriginal'].value,
      Duracion: this.formularioCrearCancion.controls['CancionDuracion'].value,
      BPM: this.formularioCrearCancion.controls['CancionBPM'].value,
      Letras: [ letra ],//Para crear una canción, el arreglo solo tiene una letra
      Artistas: this.artistas,
      Generos: this.generos,
      //Links: [],
      //Baterias: []
    }

    console.log(nuevaCancion)
    this.cancionService.postCrearCancion(nuevaCancion).subscribe(res => {
     console.log(res)
     this.router.navigate([`/canciones/${ res.CancionId }`])
    })
  }  
}
