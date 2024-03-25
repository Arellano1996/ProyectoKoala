//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function CancionPorUUIDYUsuarioUUID(cancionId: string, usuarioId){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Cancion> = context.get(getRepositoryToken(Cancion));

    return await repository.findOne({ 
        where: {
            CancionId: cancionId,
            UsuarioId: usuarioId
        }
    })
       
}