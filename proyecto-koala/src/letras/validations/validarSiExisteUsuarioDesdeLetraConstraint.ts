import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsuarioPorUUID } from 'src/common/consultas/UsuarioPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class validarSiExisteUsuarioDesdeLetraConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const usuario = await UsuarioPorUUID( object['UsuarioId'] )

    if(!usuario) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ningun usuario con este id.`
  }
}
