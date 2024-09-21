import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancionesService } from '../services/canciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarCancion } from '../interfaces/canciones.interfaces';
import { RespuestaError } from '../../shared/interfaces/respuesta.interface';

@Component({
  selector: 'app-cancion-editar',
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {

  public formularioEditarCancion: FormGroup = this.fb.group({
    CancionId: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionNombre: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionTonoOriginal: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionDuracion: ['', [ Validators.required, Validators.minLength(1) ], []],
    CancionBPM: [],
    Artistas: [0, [ Validators.required, Validators.min(1) ], []],
    Generos: [0, [ Validators.required, Validators.min(1) ], []],
  })
  
  uuid = ''
  //private notificationService = inject(MensajeEmergenteService);
  //HoverButtons = 'hover:text-blue-400'
  posicionMenu: number = 0;
  
  //Esta variable sirve para mantener mi objeto durante la creación
  artistas: string[] = []
  generos: string[] = []
  
  constructor(private fb: FormBuilder,
    private cancionService: CancionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.uuid = this.route.snapshot.paramMap.get('id')!
  
    this.cancionService.getCancionesPorCancionId( this.uuid )
    .subscribe( res => {
      this.formularioEditarCancion.controls['CancionId'].patchValue( res.CancionId )
      this.formularioEditarCancion.controls['CancionNombre'].patchValue( res.Nombre )
      this.formularioEditarCancion.controls['CancionTonoOriginal'].patchValue( res.Tono )
      this.formularioEditarCancion.controls['CancionDuracion'].patchValue( res.Duracion )
      this.formularioEditarCancion.controls['CancionBPM'].patchValue( res.BPM )
      this.formularioEditarCancion.controls['Artistas'].patchValue( res.Artistas.length )
      this.formularioEditarCancion.controls['Generos'].patchValue( res.Generos.length )
      
      this.seAgregoArtistaDesdeHijo( res.Artistas.map( artista => artista.Nombre ) )
      this.seAgregoGeneroDesdeHijo( res.Generos.map( genero => genero.Nombre ) )
      
    })
  }
  
  //Metodo es llamado desde el elemento menu-crear-cancion
  recibirPosicionMenu(index: number){
    this.posicionMenu = index;
  }

  seAgregoArtistaDesdeHijo(artistas: string[]){
    this.formularioEditarCancion.controls['Artistas'].patchValue(artistas.length)
    this.artistas = artistas
  }

  seAgregoGeneroDesdeHijo(generos: string[]){
    this.formularioEditarCancion.controls['Generos'].patchValue(generos.length)
    this.generos = generos
  }

  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioEditarCancion.controls[field].errors 
    && this.formularioEditarCancion.controls[field].touched
  }
  
  //Método al hacer submit a nuestro formulario
  onSave(){
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioEditarCancion.invalid ) {
      console.log
      this.formularioEditarCancion.markAllAsTouched()
      return
    }
    
    let editarCancion: EditarCancion = {
      CancionId: this.formularioEditarCancion.controls['CancionId'].value,
      Nombre: this.formularioEditarCancion.controls['CancionNombre'].value,
      Tono: this.formularioEditarCancion.controls['CancionTonoOriginal'].value,
      Duracion: this.formularioEditarCancion.controls['CancionDuracion'].value,
      BPM: this.formularioEditarCancion.controls['CancionBPM'].value,
      Artistas: this.artistas.map( artista => ({ 
        Nombre: artista
      })),
      Generos: this.generos.map( genero => ({
        Nombre: genero
      })),
      //Links: [],
      //Baterias: []
    }

    this.cancionService.postEditarCancion(editarCancion).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate([`/canciones/${ res.CancionId }`])
      },
      error: err => {
        console.log( err.error as RespuestaError ) 
      }
    })

  }
}
