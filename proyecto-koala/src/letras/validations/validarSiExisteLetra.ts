import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidarSiExisteLetraConstraint } from './validarSiExisteLetraConstraint';

export function ValidarSiExisteLetra(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidarSiExisteLetraConstraint
    })
  }
}
