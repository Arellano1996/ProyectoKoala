import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ConfiguracionPorUUID } from 'src/common/consultas/ConfiguracionPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidarSiExisteConfiguracionDesdeLetraConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const configuracion = await ConfiguracionPorUUID( object['ConfiguracionId'] )

    if(!configuracion) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No se encontro ninguna configuración con este id: ${ object['ConfiguracionId'] }.`
  }
}
