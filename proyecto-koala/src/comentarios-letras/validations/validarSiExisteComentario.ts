import { ValidationOptions, registerDecorator } from 'class-validator';
import { ValidarSiExisteComentarioConstraint } from './validarSiExisteComentarioConstraint';

export function ValidarSiExisteComentario(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidarSiExisteComentarioConstraint
    })
  }
}
