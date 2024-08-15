import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artistas-crear-cancion',
  templateUrl: './artistas.crear.cancion.component.html',
  styles: ``
})
export class ArtistasCrearCancionComponent {
    artistas: string[] = []

    formularioArtista: FormGroup = this.fb.group({
        Nombre: ['', [ Validators.required, Validators.minLength(1) ], []]
    })
    
    constructor(private fb: FormBuilder) { }

    //Mostrar validaciones del formulario
    isValidField( field: string ): boolean | null {
        return this.formularioArtista.controls[field].errors 
        && this.formularioArtista.controls[field].touched
    }

    eliminarArtista(index: number){
        
    }

    onSave(){
        if(this.formularioArtista.valid){
            const inputName = this.formularioArtista.controls['Nombre'].value
            //TODO: No debe haber repetidos, quitar espacios en blanco al inico y final, agregar a arreglo
            this.artistas.push(inputName)
            this.formularioArtista.controls['Nombre'].patchValue('')
        }
    }
}