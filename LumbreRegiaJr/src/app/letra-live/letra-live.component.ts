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

@Component({
  selector: 'app-letra-live',
  templateUrl: './letra-live.component.html',
})
export class LetraLiveComponent implements OnInit {
  
  letraLiveService = inject(LetraLiveService)
  letraService = inject(LetrasService)
  colorService = inject(ObtenerColorService)
  configuracionPaginaService = inject(ConfiguracionPaginaService)

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
      //console.log( res )
      this.letraId = res.LetraId

      this.letraService.getLetraPorId( res.LetraId )
      .subscribe( letra => {
        //console.log( letra )
        this.letra = letra
        const parsedLetra: CrearLetraCancion = JSON.parse( letra.Letra )
        this.cancion = parsedLetra
        this.cancion.Tono = this.letra.Tono
      }).closed

    })
  }

  ngOnInit(): void {
    //Suscribe para escuchar servidor Socket
    this.letraLiveService.recibirLetra()
    .subscribe( ( res: RespuestaRecibirLetraLive  ) => {
      this.letraId = res.LetraId
      this.actualizarCancion()
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

  actualizarCancion(){
    this.letraService.getLetraPorId( this.letraId )
      .subscribe( letra => {
        //console.log( letra )
        this.letra = letra
        const parsedLetra: CrearLetraCancion = JSON.parse( letra.Letra )
        this.cancion = parsedLetra
        this.cancion.Tono = this.letra.Tono
      }).closed
  }
  
}
