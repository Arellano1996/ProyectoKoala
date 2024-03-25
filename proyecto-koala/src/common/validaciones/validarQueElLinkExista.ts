import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from '../consultas/UsuarioPorUUID';
import { LinkPorLinkUUID } from '../consultas/LinkPorLinkUUID';


@ValidatorConstraint({ async: true })
export class validarQueElLinkExista {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const link = await LinkPorLinkUUID(object['LinkId'])

    return !!link

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontró ningun link con el id ${ object['LinkId'] }`;
  }
}
