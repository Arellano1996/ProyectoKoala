//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function ConfiguracionPorUUID(id: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<ConfiguracionesLetra> = context.get(getRepositoryToken(ConfiguracionesLetra));
    
    return await repository.findOne({ 
        where: {
            ConfiguracionesLetraId: id
        }
    })
}