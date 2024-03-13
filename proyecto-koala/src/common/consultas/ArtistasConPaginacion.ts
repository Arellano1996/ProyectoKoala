//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Artista } from "src/artistas/entities/artistas.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function ArtistasConPaginacion(limite: number, skip: number){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Artista> = context.get(getRepositoryToken(Artista));

    return await repository.createQueryBuilder('artista')
    .take( limite )
    .skip( skip )
    .getManyAndCount()
}