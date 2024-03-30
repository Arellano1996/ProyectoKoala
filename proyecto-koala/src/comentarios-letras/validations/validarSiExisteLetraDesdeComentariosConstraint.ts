import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { LetraConEntidadesPorUUID } from 'src/common/consultas/LetraConEntidadesPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class validarSiExisteLetraDesdeComentarioConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const letra = await LetraConEntidadesPorUUID( object['LetraId'] )

    if(!letra) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ninguna letra con este id.`
  }
}
