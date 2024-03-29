import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteUsuarioDesdeLetraConstraint } from './validarSiExisteUsuarioDesdeLetraConstraint';

export function validarSiExisteUsuarioDesdeLetra(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteUsuarioDesdeLetraConstraint
    })
  }
}
