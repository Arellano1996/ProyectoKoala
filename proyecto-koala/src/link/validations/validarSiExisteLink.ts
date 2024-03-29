import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteLinkConstraint } from './validarSiExisteLinkConstraint';

export function validarSiExisteLink(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteLinkConstraint
    })
  }
}
