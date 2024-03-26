import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { validarQueUnArregloDeStringNoTengaElementosRepetidos } from '../validarQueUnArregloDeStringNoTengaElementosRepetidos';

@ValidatorConstraint({ async: false })
export class validarQueLosURLNoEstenRepetidos {
  
  mensaje: string;

  validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    let urls: string[] = []
    
    object['Links'].forEach(link => {
        urls.push( link.URL )
    })

    const { hayElementosRepetidos, elementosRepetidos } = validarQueUnArregloDeStringNoTengaElementosRepetidos( urls )

    if( hayElementosRepetidos ){
      this.mensaje = elementosRepetidos
      return false
    } 

    return true

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No puede haber URL's repetidos ${ this.mensaje }`
  }
}
