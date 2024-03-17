//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Genero } from "src/generos/entities/genero.entity";
import { Repository } from "typeorm";
import { formatearSlug } from "../formatear-slug";
import { isUUID } from "class-validator";
//#endregion imports

export async function GenerosPorUUIDoTermino(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Genero> = context.get(getRepositoryToken(Genero));

    if( isUUID(termino) )
    {
        return await repository.findAndCount({
            where: { GeneroId: termino }
        })
    }
    else
    {
        return await repository
        .createQueryBuilder('genero')
        .where('genero.Slug LIKE :generoslug', {
            generoslug: `%${ formatearSlug( termino ) }%`
        })
        .getManyAndCount()
    }
}