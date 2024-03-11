//#region imports
import { BadRequestException, ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError, MustBeEntityError } from "typeorm";
//#endregion imports

class erroresHandler{

    logger: Logger;

    handleExceptions(error?: any, message?: string ){

        //Si no se envia el error, solo mostrar el mensaje
        if(!error) throw new ConflictException(message)
        //Inicializar
        this.logger.error(error)
        
        if( error.code === '23505') throw new ConflictException(message)
        
        if (error instanceof EntityNotFoundError) throw new NotFoundException(message)
        
        if(MustBeEntityError){
            // console.log(Object.getOwnPropertyNames(error))
            if (error.message === "Cannot read properties of undefined (reading 'ownerColumns')")
            throw new ConflictException('No se puede eliminar el elemento seleccionado porque está siendo referenciado por otros registros en la base de datos. Estas referencias deben eliminarse antes de continuar con la eliminación.')

            throw new ConflictException(error.message)
        } 
    
        throw new InternalServerErrorException('Error inesperado, revisar logs del servidor')
    }
}

export default erroresHandler