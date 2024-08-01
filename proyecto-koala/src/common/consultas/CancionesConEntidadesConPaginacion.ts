//#region imports
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { Cancion } from "src/canciones/entities/cancion.entity";
import { Repository } from "typeorm";
//#endregion imports

export async function CancionesConEntidadesConPaginacion(limite: number, skip: number){
    
    //Se inyecta el contexto y después el repositorio que se va a consultar
    const context = await NestFactory.createApplicationContext(AppModule)
    const repository: Repository<Cancion> = context.get(getRepositoryToken(Cancion));

    return await repository.createQueryBuilder('cancion')
    .leftJoinAndSelect('cancion.Artistas', 'artistas')//alias de las entidades
    .leftJoinAndSelect('cancion.Generos', 'generos')
    .leftJoinAndSelect('cancion.Links', 'links')
    .leftJoinAndSelect('cancion.Letras', 'letras')
    .leftJoinAndSelect('cancion.Baterias', 'baterias')
    .leftJoinAndSelect('letras.Comentarios', 'comentarios')
    .leftJoinAndSelect('letras.Configuraciones', 'configuraciones')
    .take( limite )
    .skip( skip )
    .getManyAndCount()
}
