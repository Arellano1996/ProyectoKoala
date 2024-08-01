// Importa las clases y tipos necesarios
import { Repository, DeepPartial } from 'typeorm';
import { formatearSlug } from './formatear-slug';

// Define un tipo para la función genérica
type CreateOrGetExistingEntity<T> = (
    repository: Repository<T>,
    entityDto: DeepPartial<T>,
    searchCriteria: Record<string, any>,
    entityName: string
) => Promise<T>;

// Implementa la función genérica
export const createOrGetExistingEntity: CreateOrGetExistingEntity<any> = async (
    repository,
    entityDto,
    searchCriteria,
    entityName
) => {
    
    //Este método es llamado por Genero, Artistas y Baterias
    let existingEntity;

    if(entityName === "bateria"){
        //Cuando se llama por Baterias se buscao que el Nombre y el UsuarioId no esten registrados ya
        //Puede haber un mismos Nombre pero con diferente UsuarioId
        existingEntity = await repository.createQueryBuilder(entityName)
        .where(`${entityName}.Nombre = :Nombre AND ${entityName}.usuarioUsuarioId = :UsuarioId`, searchCriteria)
        .getOne();
    }
    else
    {
        //Cuando se llama por Generos o Artistas no importa el UsuarioId, simplemente no puede haber
        //un artista o un genero repetido, por eso se creo una propiedad llama slug
        searchCriteria.Nombre = formatearSlug( searchCriteria.Nombre )
        existingEntity = await repository.createQueryBuilder(entityName)
        .where(`${entityName}.Slug = :Nombre`, searchCriteria)
        .getOne();
    }

    // Si la entidad existe, devuélvela
    if (existingEntity) return existingEntity;
    
    // Si no existe, crea una nueva entidad
    return repository.create(entityDto);
    
};

// Implementa una función genérica para procesar múltiples entidades con Promise.all
export const createOrGetExistingEntities = async <T>(
    repository: Repository<T>,
    entityDtos: DeepPartial<T>[],
    searchCriteriaFunction: (dto: DeepPartial<T>) => Record<string, any>,
    entityName: string

): Promise<T[]> => {
    return Promise.all(
        entityDtos.map(async entityDto => {
            const searchCriteria = searchCriteriaFunction(entityDto);
            return createOrGetExistingEntity(repository, entityDto, searchCriteria, entityName);
        })
    );
};

//Revisar si ya existen los generos
// const generosExistentes = await Promise.all( 
//     Generos.map(async genero => {
//       const generoExistente = await this.repositoryGenero.findOneBy({ Nombre: genero.Nombre });
//         //Si existe mandas el resultado existente
//         return generoExistente || this.repositoryGenero.create({ ...genero } as CreateGeneroDto);
//     })
//   );
