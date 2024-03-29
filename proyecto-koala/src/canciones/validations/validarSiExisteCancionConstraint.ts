import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CancionPorUUID } from 'src/common/consultas/CancionPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class validarSiExisteCancionConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const cancion = await CancionPorUUID( object['id'] )

    if(!cancion) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ninguna canción con este id.`
  }
}
