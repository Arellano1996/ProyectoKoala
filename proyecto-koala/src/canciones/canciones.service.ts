import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { createOrGetExistingEntities } from 'src/common/resultados.existentes';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import '../common/extenciones/array.extensiones';
import erroresHandler from 'src/common/errores.handler';
import { Repository } from 'typeorm';
import { CancionesConEntidadesConPaginacion } from 'src/common/consultas/CancionesConEntidadesConPaginacion';
import { CancionConArtistasPorCancionNombreYArtistaNombre } from 'src/common/consultas/CancionConArtistasPorCancionNombreYArtistaNombre';
import { CancionesConEntidadesPorUUIDoTermino } from 'src/common/consultas/CancionesConEntidadesPorUUIDoTermino';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { EditarCancionesUsuarioDto } from 'src/usuarios/dto/editar-canciones-usuario.dto';
import { Link } from 'src/link/entities/link.entity';
import { Letra } from 'src/letras/entities/letra.entity';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';
import { ConfiguracionesLetra } from 'src/configuraciones-letras/entities/configuraciones-letra.entity';
import { Bateria } from 'src/baterias/entities/bateria.entity';
import { CreateBateriaDto } from 'src/baterias/dto/create-bateria.dto';

@Injectable()
export class CancionesService extends erroresHandler {

  constructor(
    @InjectRepository(Cancion)
    private readonly repository: Repository<Cancion>,

    @InjectRepository(Genero)
    private readonly repositoryGenero: Repository<Genero>,

    @InjectRepository(Artista)
    private readonly repositoryArtista: Repository<Artista>,

    @InjectRepository(Link)
    private readonly repositoryLink: Repository<Link>,

    @InjectRepository(Letra)
    private readonly repositoryLetra: Repository<Letra>,

    @InjectRepository(ComentariosLetra)
    private readonly repositoryComentariosLetra: Repository<ComentariosLetra>,

    @InjectRepository(ConfiguracionesLetra)
    private readonly repositoryConfiguracionesLetra: Repository<ConfiguracionesLetra>,
    
    @InjectRepository(Bateria)
    private readonly repositoryBateria: Repository<Bateria>,

    @Inject(UsuariosService)
    private readonly usuariosService: UsuariosService,
  ) { 
    super()
    this.logger = new Logger('Canciones Service')
  }

  //Corroborar que todo funcioné bien
  //TODO Si se crea más de un link y no hay ninguno como default, se debe marcar el primer como default
  async create(createCancioneDto: CreateCancioneDto) {
    try {

      const { Generos, Artistas, Links, Letras, Baterias, UsuarioId, ...restoPropiedades } = createCancioneDto;

      //#region 1.- Guardar cancion con Artistas y Generos
      //Revisamos si los artistas ya existen
      const artistas = await createOrGetExistingEntities(
        this.repositoryArtista,
        Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
        artista => ({ Nombre: artista.Nombre }),
        'artista'//Nombre de la tabla
      )

      //Aquí se revisa si ya hay canciones guardadas con el artista id
      await this.RevisarDeUnaListaDeArtistasSiAlgunoYaTieneUnaCancion(artistas, createCancioneDto.Nombre);
      
      //Revisar si ya existen los generos
      //Si ya existe se regresa la entidad existente, si no se regresa un repository create
      const generos = await createOrGetExistingEntities(
        this.repositoryGenero,//Se envia el repositorio
        Generos.map(genero => ({ ...genero } as CreateGeneroDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
        genero => ({ Nombre: genero.Nombre }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo nomnbre
        'genero'//Nombre de la tabla
      );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato

      //Revisar si ya existen las baterias
      const baterias = await createOrGetExistingEntities(
        this.repositoryBateria,//Se envia el repositorio
        Baterias.map(bateria => ({ ...bateria } as CreateBateriaDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
        bateria => ({ Nombre: bateria.Nombre, UsuarioId: bateria.Usuario.UsuarioId }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo Nomnbre y UsuarioId
        'bateria'//Nombre de la tabla
      );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato

      //Esta variable guarda todo el objeto de Cancion incluyendo uuid, es necesaria para guardar la información en la base de datos
      const cancion = this.repository.create({
        ...restoPropiedades,
        UsuarioId,
        Generos: generos,
        Artistas: artistas,
        Links: Links.map( link => this.repositoryLink.create( link )),
        Letras: Letras.map( ({ Comentarios, Configuraciones, ...resto}) => this.repositoryLetra.create({
          ...resto,
          Comentarios: Comentarios.map( comentario => this.repositoryComentariosLetra.create({ 
            ...comentario 
          }) ),
          Configuraciones: Configuraciones.map( configuracion => this.repositoryConfiguracionesLetra.create({ 
            ...configuracion
          }) )
        })),
        Baterias: baterias
      })

      //#endregion guardar canción con artistas y generos
      await this.repository.save(cancion)
      
      //TODO Investigar si se puede ahorrar este save
      //2.- Ahora agregamos la cancion a la lista de canciones del usuario
      const agregarCancionAUsuario : EditarCancionesUsuarioDto = {
        UsuarioId : createCancioneDto.UsuarioId,
        AgergarCanciones: [ cancion.CancionId ],
        EliminarCanciones: []
      }
      await this.usuariosService.editarCancionesUsuario(createCancioneDto.UsuarioId, agregarCancionAUsuario)

      const _cancion = this.repository.create({
        ...restoPropiedades,
        Generos,
        Artistas,
        Baterias
      })
      
      return _cancion;

    } catch (error) {
      console.log(error)
      this.handleExceptions(error, `La canción con el nombre: ${createCancioneDto.Nombre}, ya existe`)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limite = 0, skip = 0 } = paginationDto;

      return await CancionesConEntidadesConPaginacion(limite, skip)

    } catch (error) { 
      this.handleExceptions(error)
    }
  }

  async findByTerm(termino: string) {
    try {

      let cancion: Cancion | [Cancion[], number];

      cancion = await CancionesConEntidadesPorUUIDoTermino(termino);
      
      return cancion

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  //TODO: Editar baterias
  async update(cancionId: string, updateCancioneDto: UpdateCancioneDto) {
    try {
      //Lo que se debe tomar en cuenta al momento de editar una canción, deber ser lo mismo que cuando se crea
      //Si se cambia el nombre, este nuevo nombre no debe haber sido registrado con el mismo artista, y viseversa, se se cambia el artista
      //el artista no debe tener una canción con el nombre de la canción

      //Después vemos qué recibimos en nuestro objeto canción
      const { Artistas, Generos, ...resto } = updateCancioneDto;

      let artistas, generos;

      //Si recibimos una una lista de artistas y tiene información, revisar si ya existen o son nuevos artistas
      //Así obtener la referencia del objeto que ya existe o se crea el nuevo objeto repository.create
      if( Artista && Artistas.any() ){
        artistas = await createOrGetExistingEntities(
          this.repositoryArtista,
          Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
          artista => ({ Nombre: artista.Nombre }),
          'artista'//Nombre de la tabla
        )

        //También corroboramos que los artistas recibidos no tengan una canción ya creada con el mismo nombre que se intenta registrar
        await this.RevisarDeUnaListaDeArtistasSiAlgunoYaTieneUnaCancion(artistas, updateCancioneDto.Nombre);
      }


      if( Generos && Generos.any() ){
        generos = await createOrGetExistingEntities(
          this.repositoryGenero,//Se envia el repositorio
          Generos.map(genero => ({ ...genero } as CreateGeneroDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
          genero => ({ Nombre: genero.Nombre }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo nomnbre
          'genero'//Nombre de la tabla
        );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato
      }


      const cancion = await this.repository.preload({
        CancionId: cancionId,
        ...resto,
        Artistas: artistas,
        Generos: generos
      })
      
      await this.repository.save(cancion)

      return cancion
      } catch (error) {
        this.handleExceptions(error)
      }
  
  }

  //TODO al momento de eliminar una canción se debe eliminar también los links
  async remove(cancionId: string) {
    try {
      //Para eliminar se necesita una instancia de la canción
      const cancion = await this.repository.findOneBy({ CancionId: cancionId });

      //Esta canción solo tiene la información necesaria para el usuario
      const _cancion = await this.repository.createQueryBuilder('cancion')
      .leftJoinAndSelect('cancion.Artistas', 'artistas')
      .where('cancion.CancionId = :cancionid', { cancionid: cancionId })
      .select([
        'cancion.Nombre',
        'artistas.Nombre'
      ])
      .getOne();
      
      //Eliminamos la intancia de la canción
      await this.repository.remove(cancion)

      //Y mostramos la información relevante de la canción al usuario
      return _cancion

    } catch (error) {
      this.handleExceptions(error, `La canción que se intenta borrar no existe.`)
    }
  }

  //Métodos auxiliares
  async RevisarDeUnaListaDeArtistasSiAlgunoYaTieneUnaCancion(ArtistasExistentes: CreateArtistaDto[], nombreCancion: string){
    //Aquí se revisa si la canción ya fue registrada con un artista existente
    //Puede haber canciones con el mismo nombre pero diferente artista, no con el mismo
    
    //Esta variable guardará un arreglo de exepciones, pero si no se regresa ningún error, será un arreglo vacio
    const ArtistaQueYaTienenUnaCancionConnombreCancion = await Promise.allSettled(ArtistasExistentes.map(async (artista) => {
      const { ArtistaId } = { ...artista } as Artista; //Si tienen la propiedad ArtistaId significa que ese artista ya está registrado, por lo tanto hay que corroborar si
      //ya tiene una canción registrada con el mismo nombre
      if (ArtistaId) { //Si este valor (ArtistaId) existe significa que el artista ya está registrado
          const yaHayUnaCancionConElMismoNombreYArtista = await CancionConArtistasPorCancionNombreYArtistaNombre(nombreCancion, artista.Nombre)

          if (yaHayUnaCancionConElMismoNombreYArtista) throw new ConflictException(null, `El artista ${artista.Nombre} ya tiene una canción con el nombre: ${nombreCancion}.`);
        }
      }));
      
      // return ArtistaQueYaTienenUnaCancionConnombreCancion
      ArtistaQueYaTienenUnaCancionConnombreCancion.forEach(resultado => {
        if (resultado.status === 'rejected') throw new ConflictException(resultado.reason)
      })
  }

}
