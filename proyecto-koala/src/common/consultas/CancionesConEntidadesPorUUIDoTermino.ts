//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { Repository } from "typeorm";
import { formatearSlug } from "../formatear-slug";
import { isUUID } from "class-validator";
//#endregion imports

export async function CancionesConEntidadesPorUUIDoTermino(termino: string){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Cancion> = context.get(getRepositoryToken(Cancion));

    if (isUUID(termino)) 
    {
        return await repository.findAndCount({
            where: { CancionId: termino },
            relations: {
                Artistas: true,
                Generos: true,
                Links: true,
                Letras: {
                    Comentarios: true,
                    Configuraciones: true
                }
            }
        })
    }
    else
    {
        return await repository
        .createQueryBuilder('cancion')
        .leftJoinAndSelect('cancion.Artistas', 'artistas')//alias de las entidades
        .leftJoinAndSelect('cancion.Generos', 'generos')
        .leftJoinAndSelect('cancion.Links', 'links')
        .leftJoinAndSelect('cancion.Letras', 'letras')
        .leftJoinAndSelect('letras.Comentarios', 'comentarios')
        .leftJoinAndSelect('letras.ConfiguracionesLetra', 'configuraciones')
        .where('cancion.Slug LIKE :cancionslug or artistas.Slug LIKE :artistanombre', { 
            cancionslug: `%${formatearSlug(termino)}%`, 
            artistanombre: `%${formatearSlug(termino)}%`
        })
        //Haces la referencia a las entidades y despues a sus propiedades
        .getManyAndCount()
    }
}