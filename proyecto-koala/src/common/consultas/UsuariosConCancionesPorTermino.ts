//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { AppModule } from "src/app.module";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
import { formatearSlug } from "../formatear-slug";
//#endregion imports

export async function UsuariosConCancionesPorTermino(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Usuario> = context.get(getRepositoryToken(Usuario));

    if(isUUID(termino)){
        return await repository.findAndCount({
            where: { UsuarioId: termino },
            relations: {
                Canciones: true
            }
        })
    }
    else
    {
        return await repository.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.Canciones', 'canciones')
        .where('usuario.Slug LIKE :usuarioNombre', {
            usuarioNombre: `%${ formatearSlug(termino) }%`
        })
        .getManyAndCount()
    }
}