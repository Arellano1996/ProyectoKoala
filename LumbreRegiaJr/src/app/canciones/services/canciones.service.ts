import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { BorrarCancion, BorrarCancionResponse, Cancion, CancionesResponse, CrearCancion, CrearCancionResponse } from '../interfaces/canciones.interfaces';
import { RespuestaError } from '../../shared/interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  private baseUrl: string = environments.urlServido;
  
  constructor(private http: HttpClient) { }

  getCanciones():Observable<CancionesResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  getCancionesPorTermino(termino: string):Observable<CancionesResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/${ termino }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  getCancionesPorCancionId(cancionId: string):Observable<Cancion>{
    return this.http.get<Cancion>(`${ this.baseUrl }/canciones/${ cancionId }`)
    .pipe(
      map(res => {
        return res
      })
    )
  }

  //Por UsuarioId
  getCancionesPorUsuarioId(usuarioId: string):Observable<CancionesResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/usuario/${ usuarioId }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  getCancionesPorUsuarioIdYTermino(usuarioId: string, termino: string):Observable<CancionesResponse>{
    return this.http.get<[Cancion[], number]>(`${ this.baseUrl }/canciones/usuario/${ usuarioId }/${ termino }`)
    .pipe(
      map(res => {
        return { Canciones: res[0], Total: res[1] }
      })
    )
  }

  postCrearCancion(nuevaCancion: CrearCancion): Observable<CrearCancionResponse>{
    return this.http.post<CrearCancionResponse>(`${ this.baseUrl }/canciones`, nuevaCancion)
    .pipe(
      res => { return res }
    )
  }

  deleteBorrarCancion(cancionId: string, usuarioId: string): Observable<BorrarCancionResponse> {
    const url = `${this.baseUrl}/canciones/${cancionId}/${usuarioId}`;
    return this.http.delete<BorrarCancionResponse>(url)
    .pipe(
      res => { return res }
    )
  }
}
