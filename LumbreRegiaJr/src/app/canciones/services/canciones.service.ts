import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cancion, CancionResponse } from '../interfaces/canciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  private baseUrl: string = environments.urlServido;
  
  constructor(private http: HttpClient) { }

  getCanciones():Observable<CancionResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  getCancionesPorTermino(termino: string):Observable<CancionResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/${ termino }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  //Por UsuarioId
  getCancionesPorUsuarioId(usuarioId: string):Observable<CancionResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/usuario/${ usuarioId }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  getCancionesPorUsuarioIdYTermino(usuarioId: string, termino: string):Observable<CancionResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/usuario/${ usuarioId }/${ termino }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }
}
