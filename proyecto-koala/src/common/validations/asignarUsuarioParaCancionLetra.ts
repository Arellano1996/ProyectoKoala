import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from '../consultas/UsuarioPorUUID';

@ValidatorConstraint({ async: true })
export class asignarUsuarioParaCancionLetra {

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const usuario = await UsuarioPorUUID( object['UsuarioId'] )

    if(!usuario) return false

    object['Letras'].forEach(letra => letra['Usuario'] = usuario)

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `Error en arreglo de Letras: No se puede asignar este usuario`
  }
}
