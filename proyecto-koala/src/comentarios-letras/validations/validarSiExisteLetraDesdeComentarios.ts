import { ValidationOptions, registerDecorator } from 'class-validator';
import { validarSiExisteLetraDesdeComentarioConstraint } from './validarSiExisteLetraDesdeComentariosConstraint';

export function ValidarSiExisteLetraDesdeComentario(validationOptions?: ValidationOptions)  {
  return function ( object: unknown, propertyName: string){
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: validarSiExisteLetraDesdeComentarioConstraint
    })
  }
}
