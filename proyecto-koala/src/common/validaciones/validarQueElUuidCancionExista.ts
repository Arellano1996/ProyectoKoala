import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { CancionPorUUID } from '../consultas/CancionPorUUID';


@ValidatorConstraint({ async: true })
export class validarQueElUuidCancionExista {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const cancion = await CancionPorUUID(object['CancionId'])

    return !!cancion

  }

  defaultMessage(args: ValidationArguments) {

    const { object, constraints } = args;

    return `No se encontró ninguna canción con el id ${ object['CancionId'] }`;
  }
}
