import { Injectable } from '@angular/core';
import { Configuracion } from './interfaces/tabla-canciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionPaginaService {

  configuracion : Configuracion = {
    Tabla_Canciones: {
      Artistas: true,
      Generos: true,
      Tono: true,
      BPM: true,
      Duracion: true,
    },
    Menu_Letra: {
      Letra: true,
      Acordes: true,
      Comentarios: true,
      Configuraciones: true
    },
    OcultarCancionesDeOtrosUsuarios: true
  }

  constructor() { 
    this.obtenerConfiguracion();
  }
  
  obtenerConfiguracion(): Configuracion {
    //Traemos nuevo objeto de localStorage
    const config = localStorage.getItem('config');
    if(config) 
    {
      const parsedConfig = JSON.parse(config);
      this.configuracion = parsedConfig;
    } 
    //Si no hay configuracion usamos nuestro objeto local que ya está inicializado
    else 
    {
      const newConfig: Configuracion = this.configuracion
      //Lo serializamos y lo guardamos
      localStorage.setItem('config', JSON.stringify(newConfig));
    }
    
    return this.configuracion
  }

  actualizarConfiguracion(nuevaConfiguracion: Configuracion): Configuracion {
    localStorage.setItem('config', JSON.stringify(nuevaConfiguracion));
    return this.configuracion
  }
}
