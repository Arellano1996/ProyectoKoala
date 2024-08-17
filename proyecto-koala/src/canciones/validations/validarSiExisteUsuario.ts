import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteUsuarioConstraint } from './validarSiExisteUsuarioConstraint';

export function validarSiExisteUsuario(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteUsuarioConstraint
    })
  }
}
