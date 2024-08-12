import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormatearLetraService } from '../../services/formatear-letra.service';
import { CrearCancion } from '../../interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-textarea-letra-crear-cancion',
  templateUrl: './textarea-letra-crear-cancion.component.html',
  styles: ``
})
export class TextareaLetraCrearCancionComponent {

  @Output() 
  letraHijo = new EventEmitter<CrearCancion>();

  public formularioLetra: FormGroup = this.fb.group({
    Letra: [`Será fe que yo encontré, una voz de ternura
Que me llena de placer, cuando la oigo hablar
Con ella me enamoré, que nunca la conocí
Sueño en su querer, y en sus brazos quiero dormir

Escucho cada día la radio, seguro que la vuelvo a oír
Por el cielo busco mi estrella, q la luna quiero subir`]
  })

  constructor(private fb: FormBuilder,
    private formatearLetraService: FormatearLetraService
  ) { }
  
  onSubmit(){
    //Formateamos nuestra letra que esta en nuestro textarea
    const letra = this.formatearLetraService.serializarTexto(
      this.formularioLetra.controls['Letra'].value.trim()
    )
    //La letra formateada la mandamos a nuestro elemento padre
    this.letraHijo.emit(letra)
  }
}
