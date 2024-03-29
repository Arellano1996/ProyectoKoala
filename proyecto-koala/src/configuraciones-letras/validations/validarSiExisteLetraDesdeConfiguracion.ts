import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteLetraDesdeConfiguracionConstraint } from './validarSiExisteLetraDesdeConfiguracionConstraint';

export function ValidarSiExisteLetraDesdeConfiguracion(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteLetraDesdeConfiguracionConstraint
    })
  }
}
