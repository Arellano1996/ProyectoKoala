import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from '../consultas/UsuarioPorUUID';

@ValidatorConstraint({ async: true })
export class asignarUsuarioParaCancionLink {

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    console.log( object )
    const usuario = await UsuarioPorUUID( object['UsuarioId'] )

    if(!usuario) return false

    object['Links'].forEach(link => link['Usuario'] = usuario)

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `Error en arreglo de Links: No se puede asignar este usuario`
  }
}
