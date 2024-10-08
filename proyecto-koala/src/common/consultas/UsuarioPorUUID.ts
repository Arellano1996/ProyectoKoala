//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { AppModule } from "src/app.module";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function UsuarioPorUUID(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Usuario> = context.get(getRepositoryToken(Usuario));

    if(isUUID(termino)){
        return await repository.findOne({ 
            where: {
                UsuarioId: termino 
            }
        })
    }

    return false
    
}