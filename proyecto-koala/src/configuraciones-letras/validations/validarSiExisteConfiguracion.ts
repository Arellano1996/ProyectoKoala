import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidarSiExisteConfiguracionConstraint } from './validarSiExisteConfiguracionConstraint';

export function ValidarSiExisteConfiguracion(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidarSiExisteConfiguracionConstraint
    })
  }
}
