//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Letra } from "src/letras/entities/letra.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function LetrasConEntidades(){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Letra> = context.get(getRepositoryToken(Letra));
    
    return await repository.findAndCount({
        relations: {
            Comentarios: true,
            Configuraciones: true,
            Usuario: true
        }
    })
}