import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CancionPorUUID } from 'src/common/consultas/CancionPorUUID';
import { LinkPorLinkUUID } from 'src/common/consultas/LinkPorLinkUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class validarSiExisteLinkConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const cancion = await LinkPorLinkUUID( object['id'] )

    if(!cancion) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ninguna link con este id.`
  }
}
