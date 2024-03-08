import { BadRequestException, ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError, MustBeEntityError } from "typeorm";

class erroresHandler{

    logger: Logger;

    handleExceptions(error?: any, message?: string ){
        
        // console.log(error)

        if(!error) throw new ConflictException(message);

        this.logger.error(error)

        if( error.code === '23505') throw new ConflictException(message);
        
        if (error instanceof EntityNotFoundError) throw new NotFoundException(message);
        // if(MustBeEntityError) throw new ConflictException('El id no puede ser removido');
        if(MustBeEntityError) throw new ConflictException(error.message);
    
        throw new InternalServerErrorException('Error inesperado, revisar logs del servidor')
    }
}

export default erroresHandler