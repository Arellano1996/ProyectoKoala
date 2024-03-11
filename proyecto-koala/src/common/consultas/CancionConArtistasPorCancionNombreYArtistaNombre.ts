//#region import
import { formatearSlug } from "../formatear-slug";
import { Repository } from "typeorm";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { NestFactory } from "@nestjs/core";
//#endregion import

export async function CancionConArtistasPorCancionNombreYArtistaNombre(cancionNombre: string, artistaNombre: string){

    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Cancion> = context.get(getRepositoryToken(Cancion));
    
    return await repository
    .createQueryBuilder('cancion')
    .leftJoinAndSelect('cancion.Artistas', 'artistas') //alias de las entidades
    // .leftJoinAndSelect('cancion.Generos', 'generos')
    .where('cancion.Slug = :cancionslug and artistas.Slug = :artistanombre', {
        cancionslug: formatearSlug(cancionNombre),
        artistanombre: formatearSlug(artistaNombre)
    }).getOne();
}