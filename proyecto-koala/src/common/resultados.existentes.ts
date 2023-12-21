// Importa las clases y tipos necesarios
import { Repository, DeepPartial } from 'typeorm';

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
      
    const existingEntity = await repository.createQueryBuilder(entityName)
    .where(`LOWER(${entityName}.Nombre) = LOWER(:Nombre)`, searchCriteria)
    .getOne();

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
