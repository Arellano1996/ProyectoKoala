import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { CancionPorUUID } from '../consultas/CancionPorUUID';
import { LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId } from '../consultas/LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId';


@ValidatorConstraint({ async: true })
export class validarQueElLinkNoEsteRegitradoConLaMismaCancionMismoUsuarioYDiferenteAUnLinkId {
  
  Cancion //Variable para almacenar datos asyncronos y poder utilizarlos en defaultMessage

  async validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    //Se valida que la CancionId existe
    this.Cancion = await CancionPorUUID( object['CancionId'] )

    const validarSiElUsuarioYaRegistroElLinkEnLaCancion = 
    await LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId
    (object['CancionId'], object['UsuarioId'], object['URL'], object['LinkId'])
  
    // console.log( this.Cancion )
    // console.log( validarSiElUsuarioYaRegistroElLinkEnLaCancion )
    
    //Si el usuario no tiene registrado previamente el link a la cancion en cuestion se puede registrar el link
    if(validarSiElUsuarioYaRegistroElLinkEnLaCancion === 0) return true

    //Si el usuario ya registro ese link a la cancion antes, no permitir que la cancion tenga registrado el mismo link más de una vez
    return false
    
  }
  
  defaultMessage(args: ValidationArguments) {
    
    const { object, constraints } = args;
    
    //Si CancionId no fue encontrado en la base de datos
    if(this.Cancion === null) return `No se puede asignar el link: ${ object['URL'] }, a la canción con el id: ${ object['CancionId'] }`
    
    const nombreCancion = this.Cancion['Nombre']
        
    return `Este link ${ object['URL'] } ya está registro con la canción ${ nombreCancion }, no se puede volver a registrar`
      
  }
}
