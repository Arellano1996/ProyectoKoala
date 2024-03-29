import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteCancionConstraint } from './validarSiExisteCancionConstraint';

export function validarSiExisteCancion(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteCancionConstraint
    })
  }
}
