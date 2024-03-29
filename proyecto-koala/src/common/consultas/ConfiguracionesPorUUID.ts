//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Repository } from "typeorm";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
//#endregion imports

export async function ConfiguracionesPorUUID(configuracionId: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<ConfiguracionesLetra> = context.get(getRepositoryToken(ConfiguracionesLetra));

    return await repository.findAndCount({ 
        where: { ConfiguracionesLetraId: configuracionId }
    })
}