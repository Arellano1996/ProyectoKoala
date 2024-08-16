import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormatearLetraService } from '../../services/formatear-letra.service';
import { CrearLetraCancion } from '../../interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-textarea-letra-crear-cancion',
  templateUrl: './textarea-letra-crear-cancion.component.html',
  styles: ``
})
export class TextareaLetraCrearCancionComponent implements OnInit {

  @Output() 
  letraHijo = new EventEmitter<CrearLetraCancion>();

  @Input() 
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' };
  
  public formularioLetra: FormGroup = this.fb.group({
    Letra: [``],
    Tono: ['', []]
  })

  constructor(private fb: FormBuilder,
    private formatearLetraService: FormatearLetraService
  ) { }

  ngOnInit(): void {
    //Si ya hay información en la variable canción, serializa lo que ya esta y ponlo en el input
    if(this.cancion.Lineas.length > 0){
      const texto = this.formatearLetraService.convertirCancionEnTexto({ ...this.cancion })
      this.formularioLetra.controls['Letra'].patchValue(texto)
      this.formularioLetra.controls['Tono'].patchValue(this.cancion.Tono)
    }
  }
  
  onSubmit(){
    const letraInput = this.formularioLetra.controls['Letra'].value.trim()
    const tonoInput = this.formularioLetra.controls['Tono'].value.trim()
    
    if(!letraInput) {
      this.cancion =  { Lineas: [], Tamanio: '1rem', Tono: '' };
      this.letraHijo.emit(this.cancion)
      return
    }

    this.cancion.Tono = tonoInput
    //Formateamos nuestra letra que esta en nuestro textarea
    this.cancion = { ...this.formatearLetraService.serializarTexto(letraInput, this.cancion) }

    //La letra formateada la mandamos a nuestro elemento padre
    this.letraHijo.emit(this.cancion)
  }
}
