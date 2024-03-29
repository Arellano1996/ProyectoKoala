//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Letra } from "src/letras/entities/letra.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function LetrasConEntidadesPorUsuarioYCancion(usuarioId : string, cancionId: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Letra> = context.get(getRepositoryToken(Letra));
    
    return await repository.createQueryBuilder('letra')
    .leftJoinAndSelect('letra.Comentarios', 'comentarios')
    .leftJoinAndSelect('letra.Configuraciones', 'configuraciones')
    .leftJoin('letra.Usuario', 'usuario')
    .leftJoin('letra.Cancion', 'cancion')
    .where('usuario.UsuarioId = :usuarioId AND cancion.CancionId = :cancionId', {
        usuarioId, 
        cancionId
    })
    .getManyAndCount()
}