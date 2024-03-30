//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function ComentariosConPaginacion(limite: number = 0, skip: number = 0){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<ComentariosLetra> = context.get(getRepositoryToken(ComentariosLetra));

    return await repository.createQueryBuilder('comentarios_letra')
    // .take( limite )
    // .skip( skip )
    .getManyAndCount()
}