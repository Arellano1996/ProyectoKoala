//#region imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import erroresHandler from 'src/common/errores.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID } from 'src/common/consultas/LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID';
import { LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID } from 'src/common/consultas/LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID';
import { LinkPorUsuarioYCancion } from './modelos/LinkPorUsuarioYCancion.model';
import { LinkDefaultPorUsuarioUUIDYCancionUUID } from 'src/common/consultas/LinkDefaultPorUsuarioUUIDYCancionUUID';
import { LinkPorUsuarioUUIDYLinkUUID } from 'src/common/consultas/LinkPorUsuarioUUIDYLinkUUID';
import { LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId } from 'src/common/consultas/LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId';
//#endregion imports

@Injectable()
export class LinkService extends erroresHandler {

  constructor(
    
    @InjectRepository(Link)
    private readonly repository: Repository<Link>,

  ) {
    super();
    this.logger = new Logger('Links Service')
  }
  
  async create(createLinkDto: CreateLinkDto) {
    try {
      
      const { UsuarioId, CancionId, ...resto } = createLinkDto

      const link = this.repository.create({
        Cancion: {
          CancionId
        },
        Usuario: {
          UsuarioId
        },
        ...resto
      })
  
      return await this.repository.save(link) 
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  //Todos los links de un usuario
  async EncontrarTodosLosLinksDeUnUsuario(usuarioId: string) {
    try {
      //Regresar solo los campos necesarios
      return await LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID(usuarioId)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  //Todos los links de un usuario y de una canción en especifico
  async EncontrarTodosLosLinksPorUsuarioYCancion(linkPorUsuarioYCancion: LinkPorUsuarioYCancion) {
    try {
      const { UsuarioId, CancionId } = linkPorUsuarioYCancion
  
      const linksPorUsuarioYCancion = await LinksConUsuarioYCancionesPorUsuarioUUIDYCancionUUID(UsuarioId, CancionId)
  
      return linksPorUsuarioYCancion

    } catch (error) {
      this.handleExceptions(error)
    }
    
  }
  
  //TODO: validar tokens para que otros usuario no puedan modificar los links de otros usuarios
  async update( updateLinkDto: UpdateLinkDto) {
    try {

      const link = await this.repository.preload({
        ...updateLinkDto
      })

      //#region 1 Validar que el link le pertenezca al usuario
      
      //Si el usuario le pertenece el link significa que tiene permiso para poder editarlo, pero si el link es de otro usuario
      //no lo puede editar
      //Esta consulta busca un link por LinkId y UsuarioId, debe de encontrar el link que se quiere editar si da 0, significa que
      //el link no le pertenece al usuario
      const esteLinkLePerteneceAlUsuario = await LinkPorUsuarioUUIDYLinkUUID(updateLinkDto.UsuarioId, updateLinkDto.LinkId)

      if( !(esteLinkLePerteneceAlUsuario[1] > 0) ) this.handleExceptions(null, `Este usuario no tiene permiso para editar el link`)
      
      //#endregion

      //Una vez validado que el link le pertenece al usuario, se debe validar que el URL no este repetido en un link diferente al linkId de la consulta
      //#region 2 ValidarQueElLinkNoEsteRegitradoConLaMismaCancionMismoUsuarioYDiferenteAUnLinkId

      //Voy a buscar en los links de mi usuario, basandome en la cancion que se esta editando, si el URL esta ya registrado
      const esteURLYaSeRegistroAntesConEstaCancion = await LinksConCancionYUsuarioPorCancionUUIDUsuarioUUIDURLYDiferenteALinkId(
        updateLinkDto.CancionId, updateLinkDto.UsuarioId, updateLinkDto.URL, updateLinkDto.LinkId)
      
      if( esteURLYaSeRegistroAntesConEstaCancion[1] !== 0 ) 
      this.handleExceptions(null, `Este URL ${ updateLinkDto.URL } ya está registro con la esta canción, no se puede volver a registrar`)
      //#endregion

      //Si Default es true, tenemos que buscar el link por default que está en base de datos y actualizar su estado a false
      //para poner como default el link actual, solo si su LinkId es diferente
      //#region 3 

      if(updateLinkDto.Default){
        //Para actualizar un link se necesita mandar el UsuarioId y la CancionId, si recibimos Default significa que ese link será el predeterminado para la canción
        //entonces hay que encontrar el link actual que está por Default para esa canción
        const linkActualDefatul = await LinkDefaultPorUsuarioUUIDYCancionUUID( updateLinkDto.UsuarioId, updateLinkDto.CancionId )
        
        linkActualDefatul.Default = false

        //Guardamos el linkActualDefault solo si el updateLinkDto es diferente, osea si se quiere poner un link cuyo Id es distinto al actual
        if(linkActualDefatul.LinkId != updateLinkDto.LinkId) await this.repository.save(linkActualDefatul)

      }

      //#endregion

      await this.repository.save(link)

      return await this.repository.findOneBy({ LinkId: updateLinkDto.LinkId })

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(linkId: string) {
    try {
      
      const linkAEliminar = await this.repository.createQueryBuilder('link')
      .leftJoinAndSelect('link.Usuario', 'usuario')
      .leftJoinAndSelect('link.Cancion', 'cancion')
      .where('link.LinkId = :linkId', { linkId })
      .getOneOrFail();

      const linkDeReferencia = await this.repository.createQueryBuilder('link')
      .leftJoinAndSelect('link.Cancion', 'cancion')
      .leftJoinAndSelect('link.Usuario', 'usuario')
      .where('link.LinkId = :linkId', { linkId })
      .select([
        'cancion.Nombre',
        'link.URL'
      ])
      .getOne()

      await this.repository.remove(linkAEliminar)

      //Mandamos el número de links que hay en esa canción
      const linksRestantesParaEsaCancion = await this.repository.createQueryBuilder('link')
      .leftJoinAndSelect('link.Cancion', 'cancion')
      .leftJoinAndSelect('link.Usuario', 'usuario')
      .where('cancion.CancionId = :cancionId AND usuario.UsuarioId = :usuarioId', { 
        cancionId: linkAEliminar.Cancion.CancionId, 
        usuarioId: linkAEliminar.Usuario.UsuarioId 
      })
      .getCount()
      
      return { 
        linkEliminado: linkDeReferencia, 
        linksRestantes: linksRestantesParaEsaCancion,
        seEliminoDefault: linkAEliminar.Default 
      }

    } catch (error) {
      this.handleExceptions(error, 'El link que se intenta borrar no existe.')
    }
  }
}
