//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { AppModule } from "src/app.module";
import { Letra } from "src/letras/entities/letra.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function LetraConEntidadesPorUUID(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Letra> = context.get(getRepositoryToken(Letra));

    if(isUUID(termino)){
        return await repository.findOne({ 
            where: {
                LetraId: termino 
            },
            relations: {
                Cancion: {
                    Artistas: true
                },
                Comentarios: true,
                Configuraciones: true,
                Usuario: true
            }
        })
    }

    return false
    
}