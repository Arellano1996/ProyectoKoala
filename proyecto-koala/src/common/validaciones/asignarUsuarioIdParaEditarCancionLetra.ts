import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
export class asignarUsuarioIdParaEditarCancionLetra implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const params = args.object['param'];

    console.log( params )
    //const usuario = await UsuarioPorUUID( object['UsuarioId'] )

    //if(!usuario) return false

    //object['Letras'].forEach(letra => letra['Usuario'] = usuario)

    return false
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `Error en arreglo de Letras: No se puede asignar este usuario`
  }
}
