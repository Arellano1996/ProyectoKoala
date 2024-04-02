import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidarSiExisteComentarioDesdeLetraConstraint } from './ValidarSiExisteComentarioDesdeLetraConstraint';

export function ValidarSiExisteComentarioDesdeLetra(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidarSiExisteComentarioDesdeLetraConstraint
    })
  }
}
