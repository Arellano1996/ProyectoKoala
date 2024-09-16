import { Component, inject, OnInit } from '@angular/core';
import { RespuestaRecibirLetraLive } from './interfaces/EnviarLetraLive.interface';
import { LetraLiveService } from './services/letra-live.service';
import { ObtenerColorService } from '../letras/service/obtener-color.service';
import { CrearLetraCancion } from '../canciones/interfaces/crear.cancion.interfaces';
import { Letra } from '../letras/interfaces/letras.interfaces';
import { LetrasService } from '../letras/service/letras.service';
import { ConfiguracionPaginaService } from '../shared/services/configuracion-pagina.service';
import { Configuracion } from '../shared/services/interfaces/tabla-canciones.interfaces';
import { Menu_Letra } from '../letras/interfaces/menu.letra.interface';
import { TransportarCancionService } from '../letras/service/transportar-cancion.service';

@Component({
  selector: 'app-letra-live',
  templateUrl: './letra-live.component.html',
})
export class LetraLiveComponent implements OnInit {
  
  private letraLiveService = inject(LetraLiveService)
  private letraService = inject(LetrasService)
  private colorService = inject(ObtenerColorService)
  private configuracionPaginaService = inject(ConfiguracionPaginaService)
  private transportarLetraService = inject(TransportarCancionService)
  
  menuLetra: Menu_Letra = this.configuracionPaginaService.configuracion.Menu_Letra
  
  letraId: string = ''

  letra: Letra = {
    LetraId: '',
    Letra: '',
    Tono: '',
    Usuario: undefined,
    Comentarios: [],
    Configuraciones: [],
  };
  
  cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }

  constructor() {
    //Cargar LetraLive de SQL
    this.letraLiveService.obtenerLetraLiveSQL()
    .subscribe(res => {
      if(res){
        this.letraId = res.LetraId

        this.letraService.getLetraPorId( res.LetraId )
        .subscribe( letra => {
          //console.log( letra )
          this.letra = letra
          const parsedLetra: CrearLetraCancion = JSON.parse( letra.Letra )
          this.cancion = parsedLetra
          this.cancion.Tono = this.letra.Tono
          //Todo sicronizarTono
          this.sincronizarTono(res.Tono, this.cancion.Tono)
        }).closed
      }
    })
  }

  ngOnInit(): void {
    //Suscribe para escuchar servidor Socket
    this.letraLiveService.recibirLetra()
    .subscribe( ( res: RespuestaRecibirLetraLive  ) => {
      //console.log('Recibi algo del servidor')
      //Nos aseguramos que hay información sobre LetraLive
      if(!res.LetraId) {
        this.letraId = ''
        return
      }
      //Si hay información entonces revisamos la tonalidad y que no sea la misma letra
      //Si es la misma letra también debe tener tonos diferentes
      if(this.letraId === res.LetraId){
        //console.log('Diferentes tonos')
        //Si es la misma canción revisamos si es necesario transportar
        this.sincronizarTono(res.Tono, this.cancion.Tono)
      }else{
        this.letraId = res.LetraId
        this.actualizarCancion(res.Tono)
      }
    })

    //Escuchar los cambios de una variable que esta en mi servicio
    this.configuracionPaginaService.configuracion$.subscribe(
      (config: Configuracion) => {
        this.menuLetra = config.Menu_Letra
      }
    );
  }

  obtenerColor(codigo: string){
    return this.colorService.obtenerColor(codigo)
  }

  actualizarCancion(tonoLive: number){
    this.letraService.getLetraPorId( this.letraId )
      .subscribe( letra => {
        this.letra = letra
        const parsedLetra: CrearLetraCancion = JSON.parse( letra.Letra )
        this.cancion = parsedLetra
        this.cancion.Tono = this.letra.Tono

        this.sincronizarTono(tonoLive, this.cancion.Tono)
      }).closed
  }

  //TODO corregir esto
  sincronizarTono(tonolive: number, tonosql: string){
    //console.log('se sincronizo cancion')
    //Revisamos que las tonalidades esten correctas
    //Obtenermos el tono de la letra Live
    const tonoLive = tonolive
    //Tomamos el tono de la letra en base de dato
    const tonoSQL = this.transportarLetraService.obtenerValorTono(tonosql)
    if(tonoLive != tonoSQL){
      //Si es la misma canción revisamos si es necesario transportar
      const valorTransportar = tonoLive! - tonoSQL!
      this.transportarLetraService.transportarCancion(this.cancion, valorTransportar!)
    }
  }
  
}
