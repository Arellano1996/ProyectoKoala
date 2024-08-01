import { isUUID, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { CancionPorUUID } from 'src/common/consultas/CancionPorUUID';

@ValidatorConstraint({ async: true })
export class validarQueExisteCancion {
  
  mensaje: string;

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const cancionId = object["CancionId"]

    if (!isUUID(cancionId)) {
      this.mensaje = `El valor: ${ cancionId }, no es un UUID válido`
      return false; // Si no es un UUID válido, retorna false para que falle la validación
    }
    const cancion = await CancionPorUUID( object["CancionId"] )
    
    if(!cancion) {  
      this.mensaje = `No se encontró una canción con id: ${ cancionId }`
      return false
    }
    
    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `${ this.mensaje }`
  }
}
