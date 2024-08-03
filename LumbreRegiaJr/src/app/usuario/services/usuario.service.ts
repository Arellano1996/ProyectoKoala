import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Usuario, UsuarioResponse } from '../interfaces/usuario.interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environments.urlServido;
  
  constructor(private http: HttpClient) { }

  getUsuarioPorId(usuarioId: string):Observable<UsuarioResponse>{
    return this.http.get<[Usuario[], number]>(`${ this.baseUrl }/usuarios/${usuarioId}`)
    .pipe(
      map(res => {
        return { Usuarios: res[0], Total: res[1] }
      })
    )
  }
}
