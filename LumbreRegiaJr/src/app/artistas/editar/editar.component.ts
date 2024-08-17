import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from '../services/artistas.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-artista-editar',
  templateUrl: './editar.component.html',
  styles: ``
})
export class EditarComponent {
  private uuid: string = '';
  public formularioArtista: FormGroup = this.fb.group({
    //valor inicial, validador sinconos, valor asyncronos
    ArtistaId: ['', [
      Validators.required,
    ], []],
    Nombre: ['', [
      Validators.required,
      Validators.minLength(1)
    ], []]
  })

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private artistasService: ArtistasService) { 
  }

  ngOnInit() : void{
    this.uuid = this.route.snapshot.paramMap.get('id')!
    
    //TODO se llama a base de datos para obtener el artista por su id
    this.artistasService.getArtistaPorId(this.uuid)
    .subscribe( artistasResponse => {
      if(artistasResponse != null){
        //inicializamos nuestro formulario
        this.formularioArtista.patchValue({
          ArtistaId : artistasResponse.ArtistaId,
          Nombre: artistasResponse.Nombre
        })
      }
    });

  }
  
  isValidField( field: string ): boolean | null {
    return this.formularioArtista.controls[field].errors 
    && this.formularioArtista.controls[field].touched
  }

  onSave(){
    if( this.formularioArtista.invalid ) {
      this.formularioArtista.markAllAsTouched()
      return
    }
    this.artistasService.patchEditarArtista(this.formularioArtista.value, this.uuid)
    .pipe(
      tap(artistasResponse => {
        console.log(artistasResponse);
        //TODO Mensaje de Artista Creado
        this.router.navigate(['/artistas'])
      }),
      catchError(error => {
        console.log(error.error.message);
        //TODO Mensaje emergente del error
        return of(null); // Retorna un observable vacío para que el flujo continúe
      })
    ).subscribe()
  }
  
  eliminar(){
    this.artistasService.deleteEliminarArtista(this.uuid)
    .pipe(
      tap(artistasResponse => {
        console.log(artistasResponse);
        //TODO Mensaje de Artista Creado
        this.router.navigate(['/artistas'])
      }),
      catchError(error => {
        console.log(error.error.message);
        //TODO Mensaje emergente del error
        return of(null); // Retorna un observable vacío para que el flujo continúe
      })
    ).subscribe()
  }
}
