//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function ComentarioPorUUID(id: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<ComentariosLetra> = context.get(getRepositoryToken(ComentariosLetra));
    
    return await repository.findOne({ 
        where: {
            ComentariosLetraId: id
        }
    })
}