import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Artista, ArtistaResponse, CrearArtista } from '../interfaces/artistas.interface';
import { environments } from '../../../environments/environments';
import { RespuestaError } from '../../shared/interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  private baseUrl: string = environments.urlServido;

  constructor(private http: HttpClient) { }

  getArtistas():Observable<ArtistaResponse>{
    return this.http.get<[Artista[], number]>(`${ this.baseUrl }/artistas`)
    .pipe(
      map(res => {
        return { Artistas: res[0], Total: res[1] }
      })
    )
  }

  getArtistaPorId(Id: string):Observable<Artista>{
    return this.http.get<Artista>(`${ this.baseUrl }/artistas/${Id}`)
  }

  postCrearArtista(artista: CrearArtista):Observable<CrearArtista | RespuestaError>{
    return this.http.post<Artista | RespuestaError>(`${ this.baseUrl }/artistas`, artista)
  }

}
