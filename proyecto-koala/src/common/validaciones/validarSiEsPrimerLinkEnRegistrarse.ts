import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID } from '../consultas/LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID';


@ValidatorConstraint({ async: true })
export class validarSiEsPrimerLinkEnRegistrarse {
  
  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Las posibles respuestas son un usuario o null
    const link = await LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID(object['UsuarioId'], object['CancionId'])
    
    //Si no hay resultados entonces este link será el default, si ya hay más resultados default será falso
    if(link[1] === 0) object['Default'] = true
    
    return true

  }

  defaultMessage(args: ValidationArguments) {

    return `Revisar validación al crear Link`

  }
}
