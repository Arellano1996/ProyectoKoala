//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { AppModule } from "src/app.module";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function CancionPorUUID(cancionId: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Cancion> = context.get(getRepositoryToken(Cancion));
      
    return await repository.findOne({ 
        where: {
            CancionId: cancionId 
        }
    })
       
}