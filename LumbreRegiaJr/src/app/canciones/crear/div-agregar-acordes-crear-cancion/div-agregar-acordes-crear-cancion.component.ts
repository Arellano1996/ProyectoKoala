import { Component, Input } from '@angular/core';
import { CrearLetraCancion } from '../../interfaces/crear.cancion.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormatearLetraService } from '../../services/formatear-letra.service';

@Component({
  selector: 'app-div-agregar-acordes-crear-cancion',
  templateUrl: './div-agregar-acordes-crear-cancion.component.html',
  styles: ``
})
export class DivAgregarAcordesCrearCancionComponent {
  
  //Esta variable sirve para mantener mi objeto durante la creación
  @Input() 
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' };

  //Esto sirve para ocultar los botones que permiten editar y mostrar los botones de editar pero que estan deshabilitados, la propiedad linea sirve para ocultar el boton deshabilitado
  //de mi actual div en el cuál estoy haciendo la edición, entonces el boton deshabilitado se muetra en todos los div o lineas menos en la que estoy editando actualmente
  seEstaEditantoUnaLinea = {
    bool: false,
    linea: 0
  }

  public formularioCancion: FormGroup = this.fb.group({
    Linea: ['', []]
  })


  constructor(private fb: FormBuilder, 
    private letraService: FormatearLetraService) 
  { }

  modificarLinea(indice: number){
    //Cuando se da click en editar una linea
    //Tomamos la linea que queremos editar
    const linea = this.cancion.Lineas[indice]
    //La formateamos en texto plano
    const string = this.letraService.convertirLineaEnString(linea)
    //guardamos ese valor en el formulario para que el usuario vea el valor en el input
    this.formularioCancion.controls['Linea'].patchValue(string)

    //Esto sirve para manejar las opciones visuales, como otros botónes de editar, etc
    this.seEstaEditantoUnaLinea = { bool: true, linea: indice }
    this.cancion.Lineas[indice].SeEstaEditando = true;
  }
  
  guardarLineaModificada(indice: number){
    console.log(indice)
    //Tomamos el valor del input
    const lineaEditada = this.formularioCancion.controls['Linea'].value
    //Formateamos una nueva linea con el texto del input
    const nuevaLinea = this.letraService.convertirStringEnLinea(lineaEditada, this.cancion.Lineas[indice])
    //Agregamos ese texto formateado a nuestra variable
    this.cancion.Lineas[indice] = nuevaLinea

    //Escondemos las opciones que ya no son necesarias para editar
    this.cancion.Lineas[indice].SeEstaEditando = false;
    this.seEstaEditantoUnaLinea = { bool: false, linea: indice }
  }
  
  cambiarColorLinea(indice: number){
    console.log( this.cancion.Lineas[indice].Color )
    if(this.cancion.Lineas[indice].Color === '') this.cancion.Lineas[indice].Color = '1'
    else this.cancion.Lineas[indice].Color = (this.cancion.Lineas[indice].Color === '0') ? '1' : '0'
  }

  test(){
    console.log( this.cancion )
  }
}
