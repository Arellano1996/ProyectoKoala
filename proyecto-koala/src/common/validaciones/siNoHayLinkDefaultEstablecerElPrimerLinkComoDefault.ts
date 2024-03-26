import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { cuantoElementosVerdaderosTieneElArreglo } from '../cuantoElementosVerdaderosTieneElArreglo';

@ValidatorConstraint({ async: false })
export class siNoHayLinkDefaultEstablecerElPrimerLinkComoDefault {
  
  mensaje: string;

  validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    //Formamos nuestro arreglo para hacer la comprobación
    let arregloBool = []

    object['Links'].forEach(link => {
        arregloBool.push( link.Default )
    })

    const numeroDeElementosVerdaderos = cuantoElementosVerdaderosTieneElArreglo( arregloBool );

    // console.log('Resultado de validar que solo haya un bool: ' + numeroDeElementosVerdaderos)

    if(numeroDeElementosVerdaderos === 0) {

      object['Links'][0]['Default'] = true

      return true
    }

    if(numeroDeElementosVerdaderos === 1) return true

    this.mensaje = 'Solo puede haber un Link marcado como Default'

    return false

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `Error en arreglo de Links: ${ this.mensaje }`
  }
}
