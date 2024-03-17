//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function UsuariosConPaginacion(limite: number, skip: number){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Usuario> = context.get(getRepositoryToken(Usuario));

    return await repository.createQueryBuilder('usuario')
    .leftJoinAndSelect('usuario.Canciones', 'canciones')
    .take( limite )
    .skip( skip )
    .getManyAndCount()
}