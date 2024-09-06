import { Injectable } from '@angular/core';
import { Configuracion } from './interfaces/tabla-canciones.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionPaginaService {
  
  private configuracionSubject = new BehaviorSubject<Configuracion>(this.obtenerConfiguracion());
  configuracion$ = this.configuracionSubject.asObservable();
  
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
    
    //Si no hay configuracion usamos nuestro objeto local que ya está inicializado
    if(config === 'undefined' || config === null){
      const newConfig: Configuracion = this.configuracion
      //Lo serializamos y lo guardamos
      localStorage.setItem('config', JSON.stringify(newConfig));
    }else
    {
      const parsedConfig = JSON.parse(config);
      this.configuracion = parsedConfig;
    } 
    
    return this.configuracion
  }

  actualizarConfiguracion(nuevaConfiguracion: Configuracion): Configuracion {
    localStorage.setItem('config', JSON.stringify(nuevaConfiguracion));
    this.configuracionSubject.next(this.configuracion);
    return this.configuracion
  }
}
