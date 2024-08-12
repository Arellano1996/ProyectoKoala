import { Component, Input } from '@angular/core';
import { CrearCancion, Lineas, PalabrasCrearCancion } from '../../interfaces/crear.cancion.interfaces';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-div-agregar-acordes-crear-cancion',
  templateUrl: './div-agregar-acordes-crear-cancion.component.html',
  styles: ``
})
export class DivAgregarAcordesCrearCancionComponent {
  
  //Esta variable sirve para mantener mi objeto durante la creación
  @Input() 
  cancion: CrearCancion = { Lineas: [], Tamanio: '1rem' };

  //Esto sirve para ocultar los botones que permiten editar y mostrar los botones de editar pero que estan deshabilitados, la propiedad linea sirve para ocultar el boton deshabilitado
  //de mi actual div en el cuál estoy haciendo la edición, entonces el boton deshabilitado se muetra en todos los div o lineas menos en la que estoy editando actualmente
  seEstaEditantoUnaLinea = {
    bool: false,
    linea: 0
  }

  public formularioCancion: FormGroup = this.fb.group({
    Lineas: this.fb.array([])
  })

  get Lineas(){
    return this.formularioCancion.get('Lineas') as FormArray;
  }

  activePopover: string = ''
  togglePopover(index: string, index2: string): void {
    const intexNumber = index + index2
    console.log( intexNumber )
    this.activePopover = this.activePopover === intexNumber ? '' : intexNumber;
  }

  constructor(private fb: FormBuilder,) {
  }

  unirPalabras(palabras: PalabrasCrearCancion[]){
    return palabras.map(p => p.Palabra).join(' ');
  }

  modificarLinea(indice: number){
    //Cuando se da click en editar una linea
    this.seEstaEditantoUnaLinea = { bool: true, linea: indice }
    this.formularioCancion.controls['Letra'].patchValue(
      this.unirPalabras( this.cancion.Lineas[indice].Palabras )
    )
    this.cancion.Lineas[indice].SeEstaEditando = true;
  }
  
  guardarLineaModificada(indice: number){
    // console.log( evento.target )
    // console.log( this.formularioEditarLinea.controls['Letra'].value )
    
    const nuevaLinea = this.formularioCancion.controls['Letra'].value;
    
    // Separar el string en palabras
    const palabras = nuevaLinea.split(' ').filter( ( palabra: any ) => palabra.trim() !== '');

    // Crear un nuevo arreglo de palabras para la línea específica
    const nuevasPalabras: PalabrasCrearCancion[] = palabras.map((palabra: string) => ({
      Palabra: palabra,
      Acorde: {
        Acorde: '',
        Posicion: ''
      }
    }));
    
    // Actualizar las palabras en la línea correspondiente
    this.cancion.Lineas[indice].Palabras = nuevasPalabras;
    
    //Actualizar mi textarea, para que sea más claro primero formateo mi texto y despues
    //lo agergo a mi formulario
    const textArea = this.cancion.Lineas.map( (linea: Lineas ) => {
      return linea.Palabras.map( p => p.Palabra ).join(' ')
    }).join('\n')

    // this.formularioCrearCancion.controls['Letra'].patchValue(textArea)

    this.cancion.Lineas[indice].SeEstaEditando = false;
    this.seEstaEditantoUnaLinea = { bool: false, linea: indice }
  }

  test(){
    console.log( this.cancion )
  }

  cambioAcorde(linea: number, palabra: number, valor: string){
    this.cancion.Lineas[linea].Palabras[palabra].Acorde.Acorde = valor
  }

  cambioPosicionAcorde(linea: number, palabra: number, valor: number){
    
    const acorde = this.cancion.Lineas[linea].Palabras[palabra].Acorde
    if( !acorde.Acorde ) return
    if(valor === 2) acorde.Posicion = valor
    else 
    {
      //Esto permite que las sumas y restas permanezcan en un rango de 0 a 4
      if(valor > 0 && acorde.Posicion < 4) acorde.Posicion += valor
      else if(valor < 0 && acorde.Posicion > 0) acorde.Posicion += valor
        else if(valor > 0 && acorde.Posicion === 4) acorde.Posicion -= valor
          else if(valor < 0 && acorde.Posicion === 0) acorde.Posicion -= valor
    } 
    
    console.log(this.cancion.Lineas[linea].Palabras[palabra].Acorde)
    
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['cancion']) {
  //     console.log('El valor de inputValue ha cambiado:', changes['inputValue'].currentValue);
  //     // Aquí puedes manejar el cambio del valor
  //   }
  // }
  
}
