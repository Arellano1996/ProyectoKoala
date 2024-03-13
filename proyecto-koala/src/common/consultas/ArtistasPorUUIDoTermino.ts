//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Artista } from "src/artistas/entities/artistas.entity";
import { Repository } from "typeorm";
import { formatearSlug } from "../formatear-slug";
import { isUUID } from "class-validator";
//#endregion imports

export async function ArtistasPorUUIDoTermino(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Artista> = context.get(getRepositoryToken(Artista));

    if( isUUID(termino) )
    {
        return await this.repository.findOneBy({ ArtistaId: termino })
    }
    else
    {
        return await repository
        .createQueryBuilder('artista')
        .where('artista.Slug LIKE :artistaslug', {
            artistaslug: `%${formatearSlug(termino)}%`
        })
        .getManyAndCount()
    }
}