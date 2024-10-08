import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsuarioPorUUID } from 'src/common/consultas/UsuarioPorUUID';

@ValidatorConstraint({ async: true })
export class asignarUsuarioParaCancionBateria {

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const usuario = await UsuarioPorUUID( object['UsuarioId'] )

    if(!usuario) return false

    object['Baterias'].forEach(bateria => bateria['Usuario'] = usuario)

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `Error en arreglo de Baterias: No se puede asignar este usuario`
  }
}
