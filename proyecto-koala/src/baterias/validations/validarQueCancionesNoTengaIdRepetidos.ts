import { ValidationArguments, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ async: true })
export class validarQueCancionesNoTengaIdRepetidos {
  
  mensaje: string;

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;
    
    const canciones = object["Canciones"]

    //Validar que no haya Canciones {
    // CancionId <-- Canciones Id repetidos
    // }
    //Se crea un conjunto para almacenar todos los elementos únicos
    const idsUnicos = new Set()
    let hayDuplicados = false

    canciones.forEach(cancion => {
      const { CancionId } = cancion;//Desestructuración
    
      if (idsUnicos.has(CancionId)) {//Al principio el conjunto está vacío
        console.log(`Duplicado encontrado: ${CancionId}`);
        hayDuplicados = true;
      } else {
        idsUnicos.add(CancionId);
      }
    });

    if (hayDuplicados) return false

    return true
  }

  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;

    return `No puede haber Id's repetidos.`
  }
}
