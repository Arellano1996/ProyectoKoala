//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Genero } from "src/generos/entities/genero.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function GenerosConPaginacion(limite: number, skip: number){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Genero> = context.get(getRepositoryToken(Genero));

    return await repository.createQueryBuilder('genero')
    .take( limite )
    .skip( skip )
    .getManyAndCount()
}