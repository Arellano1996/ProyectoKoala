import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancionesService } from '../../services/canciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artistas-crear-cancion',
  templateUrl: './artistas.crear.cancion.component.html',
  styles: ``
})
export class ArtistasCrearCancionComponent {

    @Input()
    artistas: string[] = []
    
    @Output() agregar = new EventEmitter<string[]>()

    formularioArtistas: FormGroup = this.fb.group({
        Nombre: ['', [ Validators.required, Validators.minLength(1) ], []]
    })
    
    constructor(private fb: FormBuilder) {
        
    }

    eliminarArtista(index: number){
        this.artistas.splice(index, 1)
        this.agregar.emit(this.artistas)
    }
    
    onSave(){
        if(this.formularioArtistas.valid){
            const inputName = this.formularioArtistas.controls['Nombre'].value
            //TODO: No debe haber repetidos, quitar espacios en blanco al inico y final, agregar a arreglo
            this.artistas.push(inputName)
            this.formularioArtistas.controls['Nombre'].patchValue('')
            //Si se agrega se manda a Padre
            this.agregar.emit(this.artistas)
        }
    }

    recibirArtistasDesdePadre(){

    }
}