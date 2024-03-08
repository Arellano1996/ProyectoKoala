import { Artista } from "src/artistas/entities/artistas.entity";
import { formatearSlug } from "../formatear-slug";
import { ConflictException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateCancioneDto } from "src/canciones/dto/create-cancione.dto";
import { CreateArtistaDto } from "src/artistas/dto/create-artista.dto";

export const CancionesPorArtistasIds = async (ArtistasExistentes: CreateArtistaDto[], CreateCancioneDto: CreateCancioneDto, Repository: Repository<any>) => {
    //Aquí se revisa si la canción ya fue registrada con un artista existente
    //Puede haber canciones con el mismo nombre, pero con diferente artista
    //Esta variable guardará un arreglo de exepciones, pero si no se regresa ningún error, será un arreglo vacio
    const yaExiste = Promise.allSettled(ArtistasExistentes.map(async (artista) => {
        const { ArtistaId } = { ...artista } as Artista; //Si tienen la propiedad ArtistaId significa que ese artista ya está registrado, por lo tanto hay que corroborar si
        //ya tiene una canción registrada con el mismo nombre
        if (ArtistaId) { //Si este valor (ArtistaId) existe significa que el artista ya está registrado

            const yaHayUnaCancionConElMismoNombreYArtista = await Repository.createQueryBuilder('cancion')
                .leftJoinAndSelect('cancion.Artistas', 'artistas') //alias de las entidades
                // .leftJoinAndSelect('cancion.Generos', 'generos')
                .where('cancion.Slug = :cancionslug and artistas.Slug = :artistanombre', {
                    cancionslug: formatearSlug(CreateCancioneDto.Nombre),
                    artistanombre: formatearSlug(artista.Nombre)
                }).getOne();

            if (yaHayUnaCancionConElMismoNombreYArtista) throw new ConflictException(null, `El artista ${artista.Nombre} ya tiene una canción con el nombre: ${CreateCancioneDto.Nombre}.`);
        }
    }));

    return yaExiste;
}