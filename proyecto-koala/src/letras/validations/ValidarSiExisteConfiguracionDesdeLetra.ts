import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidarSiExisteConfiguracionDesdeLetraConstraint } from './ValidarSiExisteConfiguracionDesdeLetraConstraint';

export function ValidarSiExisteConfiguracionDesdeLetra(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidarSiExisteConfiguracionDesdeLetraConstraint
    })
  }
}
