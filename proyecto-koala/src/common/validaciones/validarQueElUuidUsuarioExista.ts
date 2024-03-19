import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from '../consultas/UsuarioPorUUID';


@ValidatorConstraint({ async: false })
export class validarQueElUuidUsuarioExista {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const usuario = await UsuarioPorUUID(object['Creador'])

    return !!usuario

  }

  defaultMessage(args: ValidationArguments) {
    return `El usuario creador no existe`;
  }
}
