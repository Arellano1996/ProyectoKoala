import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CancionPorUUID } from 'src/common/consultas/CancionPorUUID';
import { UsuarioPorUUID } from 'src/common/consultas/UsuarioPorUUID';

@ValidatorConstraint({ async: true })
@Injectable()
export class validarSiExisteCancionConUsuarioIdConstraint implements ValidatorConstraintInterface  {

  async validate(value: any, args) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const cancion = await CancionPorUUID( object['cancionId'] )
    
    if( cancion.UsuarioId === object['usuarioId']){
      return true
    }
    return false
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No tienes permiso para eliminar esta canción.`
  }
}
