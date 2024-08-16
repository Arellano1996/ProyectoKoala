import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-generos-crear-cancion',
    templateUrl: './generos.crear.cancion.component.html',
})
export class GenerosCrearCancionComponent {
    generos: string[] = []

    @Output() agregar = new EventEmitter<string[]>()
    
    formularioGeneros: FormGroup = this.fb.group({
        Nombre: ['', [ Validators.required, Validators.minLength(1) ], []]
    })
    
    constructor(private fb: FormBuilder) { }

    eliminarGenero(index: number){
        this.generos.splice(index, 1)
        this.agregar.emit(this.generos)
    }
    
    onSave(){
        if(this.formularioGeneros.valid){
            const inputName = this.formularioGeneros.controls['Nombre'].value
            //TODO: No debe haber repetidos, quitar espacios en blanco al inico y final, agregar a arreglo
            this.generos.push(inputName)
            this.formularioGeneros.controls['Nombre'].patchValue('')
            this.agregar.emit(this.generos)
        }
    }
}