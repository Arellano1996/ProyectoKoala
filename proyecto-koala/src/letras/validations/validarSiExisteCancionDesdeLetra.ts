import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteCancionDesdeLetraConstraint } from './validarSiExisteCancionDesdeLetraConstraint';

export function validarSiExisteCancionDesdeLetra(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteCancionDesdeLetraConstraint
    })
  }
}
