import { Injectable, Logger } from '@nestjs/common';
import { LetraLive } from './entities/letra-live.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import erroresHandler from 'src/common/errores.handler';
import { CrearLetraLive } from './dto-SQL/crear-letra-live-dto';

@Injectable()
export class LetrasLiveSQLService extends erroresHandler {

    constructor(
        @InjectRepository(LetraLive)
        private readonly repository: Repository<LetraLive>
    ) {
        super()
        this.logger = new Logger('Letra-Live-SQL Service')
    }

    async create(crearLetraLive: CrearLetraLive){
        try {
            const nuevaLetraLive = this.repository.create({
                ...crearLetraLive
            })
    
            await this.repository.save( nuevaLetraLive )
    
            return nuevaLetraLive
        } catch (error) {
            this.handleExceptions( error )
        }
    }

    async findByUsuarioId(UsuarioId: string){
        try {
            const letraLivePorUsuarioId = await this.repository.findOneBy({
                UsuarioId
            })

            return letraLivePorUsuarioId
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    
    async delete(UsuarioId: string){
        try {

            const letrasLivePorUsuarioId = await this.repository.findBy({
                UsuarioId
            })

            return letrasLivePorUsuarioId
            
        } catch (error) {
            this.handleExceptions( error )
        }
    }
    //Para eliminar un grupo de elementos
    async remove(UsuarioId: string){
        try {
            const letrasLive: LetraLive[] = await this.repository.findBy({ UsuarioId })
            
            if(letrasLive) await this.repository.remove( letrasLive )
        } catch (error) {
            this.handleExceptions( error )
        }
    }
}
