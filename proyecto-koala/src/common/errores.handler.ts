import { BadRequestException, ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";

class erroresHandler{

    logger: Logger;

    handleExceptions(error?: any, message?: string ){
        
        if(!error) throw new ConflictException(message);

        this.logger.error(error)

        if( error.code === '23505'){
            throw new ConflictException(message);
        }
    
        throw new InternalServerErrorException('Error inesperado, revisar logs del servidor')
    }
}

export default erroresHandler