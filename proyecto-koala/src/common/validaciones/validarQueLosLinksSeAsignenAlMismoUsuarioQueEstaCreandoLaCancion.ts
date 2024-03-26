import { ValidationArguments, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ async: false })
export class validarQueLosLinksSeAsignenAlMismoUsuarioQueEstaCreandoLaCancion {
  
  mensaje: string;

  validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    const usuarioId = object['UsuarioId']
    
    for (const link of object['Links']) {

      const usuarioIdLink = link['UsuarioId']
      
      if (usuarioIdLink !== usuarioId) {
        this.mensaje = usuarioIdLink
        return false; // Si encuentra un elemento que no cumple, retorna false
      }
      
    }

    return true

  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    if(this.mensaje === undefined) return `Todos los Links deben tener UsuarioId`
    return `No tienes permisos para asignar links al usuario con id ${ this.mensaje }`
  }
}
