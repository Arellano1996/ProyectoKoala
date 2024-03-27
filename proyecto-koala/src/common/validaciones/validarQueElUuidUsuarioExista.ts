import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from '../consultas/UsuarioPorUUID';


@ValidatorConstraint({ async: true })
export class validarQueElUuidUsuarioExista {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const usuario = await UsuarioPorUUID(object['UsuarioId'])

    return !!usuario

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;
    if( object['UsuarioId'] === undefined) return `El campo UsuarioId es obligatorio`
    return `No se encontró ningun usuario con el id ${ object['UsuarioId'] }`;
  }
}
