import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArtistasService } from '../services/artistas.service';
import { catchError, of, tap } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {

  public formularioArtista: FormGroup = this.fb.group({
    //valor inicial, validador sinconos, valor asyncronos
    Nombre: ['', [
      Validators.required,
      Validators.minLength(1)
    ], []]
  })

  constructor(private fb: FormBuilder,
    private artistasService: ArtistasService,
    private router: Router
  ) { }

  isValidField( field: string ): boolean | null {
    return this.formularioArtista.controls[field].errors 
    && this.formularioArtista.controls[field].touched
  }

  onSave(){
    if( this.formularioArtista.invalid ) {
      this.formularioArtista.markAllAsTouched()
      return
    }

      this.artistasService.postCrearArtista(this.formularioArtista.value).pipe(
        tap(artistasResponse => {
          console.log(artistasResponse);
          //TODO Mensaje de Artista Creado
          this.router.navigate(['/artistas'])
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(null); // Retorna un observable vacío para que el flujo continúe
        })
      ).subscribe()


  }
}
