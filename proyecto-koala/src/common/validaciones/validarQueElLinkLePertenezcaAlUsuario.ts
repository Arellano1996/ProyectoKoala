import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { LinksPorUsuarioUUIDYLinkUUID } from '../consultas/LinksPorUsuarioUUIDYLinkUUID';


@ValidatorConstraint({ async: true })
export class validarQueElLinkLePertenezcaAlUsuario {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const link = await LinksPorUsuarioUUIDYLinkUUID(object['UsuarioId'], object['LinkId'])

    console.log(object)
    //Si link vale más de 0 significa que hay un link con el linkId y el usuarioId que se pide
    return link[1] > 0

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `El link con id: ${ object['LinkId'] }, no le pertenece al usuario con id: ${ object['UsuarioId'] }`
  }
}
