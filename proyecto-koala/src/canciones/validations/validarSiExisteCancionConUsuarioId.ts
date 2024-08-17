import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteCancionConUsuarioIdConstraint } from './validarSiExisteCancionConUsuarioIdConstraint';

export function validarSiExisteCancionConUsuarioId(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteCancionConUsuarioIdConstraint
    })
  }
}
