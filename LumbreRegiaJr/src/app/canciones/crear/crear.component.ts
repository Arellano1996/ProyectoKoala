import { Component, inject } from '@angular/core';
import { CrearCancion, Lineas, MenuCrearCancion, PalabrasCrearCancion } from '../interfaces/crear.cancion.interfaces';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajeEmergenteService } from '../../shared/mensaje-emergente/mensaje-emergente.service';
import { NotificationType } from '../../shared/mensaje-emergente/interfaces/mensaje-alerta.interfaces';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: ``
})
export class CrearComponent {

  private notificationService = inject(MensajeEmergenteService);
  HoverButtons = 'hover:text-blue-400'
  //Esta variable sirve para manejar el estado de mi menu, para saber qué opcion está seleccionada al momento de crear una canción; se inicializa en el contructor en la primera opción Letra = 0
  menuCrearCancion: MenuCrearCancion;

  public formularioCrearCancion: FormGroup = this.fb.group({
    //valor inicial, validador sinconos, valor asyncronos
    Letra: ['', [
      Validators.required,
      Validators.minLength(1)
    ], []]
  })

  public formularioEditarLinea: FormGroup = this.fb.group({
    Letra: []
  })

  //Esto sirve para ocultar los botones que permiten editar y mostrar los botones de editar pero que estan deshabilitados, la propiedad linea sirve para ocultar el boton deshabilitado
  //de mi actual div en el cuál estoy haciendo la edición, entonces el boton deshabilitado se muetra en todos los div o lineas menos en la que estoy editando actualmente
  seEstaEditantoUnaLinea = {
    bool: false,
    linea: 0
  }

  //Esta variable sirve para mantener mi objeto durante la creación
  cancion: CrearCancion = { Lineas: [], Tamanio: '1rem' };

  constructor(private fb: FormBuilder,) {
    this.menuCrearCancion = {
      opcion: 0
    }
  }

  //Cuando doy click en Editar en alguna Linea
  seleccionarOpcion(opcion: number){
    //Si se vuelve a seleccionar la misma opcion no hacer nada
    if(this.menuCrearCancion.opcion === opcion ) return

    //Actualizamos nuestra variable para manejar el estado de nuestro menu y saber en qué opcion estamos
    this.menuCrearCancion.opcion = opcion

    //Si pasamos a la opción 1 hay que serializar nuestra letra
    //TODO solo si nuestra Letra no está vacia
    if(opcion === 1 /* Acordes */){
      this.serializarLetra()
    }
  }

  //Mostrar validaciones del formulario
  isValidField( field: string ): boolean | null {
    return this.formularioCrearCancion.controls[field].errors 
    && this.formularioCrearCancion.controls[field].touched
  }
  
  //Método al hacer submit a nuestro formulario
  onSave(){
    //this.notificationService.showAlert(NotificationType.Warning, 'Falta la Letra')
    if( this.formularioCrearCancion.invalid ) {
      this.formularioCrearCancion.markAllAsTouched()
      return
    }
  }
  
  serializarLetra(){

    const letra = this.formularioCrearCancion.controls['Letra'].value;
    const lineas = letra.split('\n');


    this.cancion.Lineas = lineas.map((linea: string) => ({
      SaltoLinea: (linea.trim().length === 0) ? true : false,
      SeEstaEditando: false,
      Color: '',
      Palabras: linea.split(' ').filter(palabra => palabra.trim() !== '').map((palabra: string) => ({
        Palabra: palabra,
        Acorde: {
          Acorde: '',
          Posicion: ''
        }
      }))
    }));

    console.log(this.cancion);

  }

  unirPalabras(palabras: PalabrasCrearCancion[]){
    return palabras.map(p => p.Palabra).join(' ');
  }

  modificarLinea(indice: number){
    //Cuando se da click en editar una linea
    this.seEstaEditantoUnaLinea = { bool: true, linea: indice }
    this.formularioEditarLinea.controls['Letra'].patchValue(
      this.unirPalabras( this.cancion.Lineas[indice].Palabras )
    )
    this.cancion.Lineas[indice].SeEstaEditando = true;
  }
  
  guardarLineaModificada(indice: number){
    // console.log( evento.target )
    // console.log( this.formularioEditarLinea.controls['Letra'].value )
    
    const nuevaLinea = this.formularioEditarLinea.controls['Letra'].value;
    
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

    this.formularioCrearCancion.controls['Letra'].patchValue(textArea)

    this.cancion.Lineas[indice].SeEstaEditando = false;
    this.seEstaEditantoUnaLinea = { bool: false, linea: indice }
  }
}
