import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ComentarioPorUUID } from 'src/common/consultas/ComentarioPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidarSiExisteComentarioConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const comentario = await ComentarioPorUUID( object['id'] )

    if(!comentario) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ningun comentario con este id.`
  }
}
