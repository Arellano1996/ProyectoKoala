import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { AppModule } from "src/app.module";
import { Letra } from "src/letras/entities/letra.entity";
import { Repository } from "typeorm";

export async function LetraPorUUID(letraId: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Letra> = context.get(getRepositoryToken(Letra));

    if(isUUID(letraId)){
        return await repository.findOne({ 
            where: {
                LetraId: letraId 
            }
        })
    }

    return false
    
}