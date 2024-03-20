//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Link } from "src/link/entities/link.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDYURL(cancionId: string, usuarioId: string, url: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Link> = context.get(getRepositoryToken(Link));

    return await repository
    .createQueryBuilder('link')
    .leftJoinAndSelect('link.Usuario', 'usuario')
    .leftJoinAndSelect('link.Cancion', 'cancion')
    .where(`usuario.UsuarioId = :usuarioId AND cancion.CancionId = :cancionId AND link.URL = :url`, {
        usuarioId,
        cancionId,
        url
    })
    .getCount()
}