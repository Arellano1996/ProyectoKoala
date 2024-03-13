//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Repository } from "typeorm";
import { formatearSlug } from "../formatear-slug";
import { isUUID } from "class-validator";
import { Genero } from "src/generos/entities/genero.entity";
//#endregion imports

export async function GenerosPorUUIDoTermino(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Genero> = context.get(getRepositoryToken(Genero));

    if( isUUID(termino) )
    {
        return await this.repository.findOneBy({GeneroId: termino})
    }
    else
    {
        return await repository
        .createQueryBuilder('artista')
        .where('genero.Slug LIKE :generoslug', {
            generoslug: `%${ formatearSlug( termino ) }%`
        })
        .getManyAndCount()
    }
}