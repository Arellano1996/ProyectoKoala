import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IniciarSesion, IniciarSesionRespuesta, UsuarioAutentificado } from '../interfaces/iniciar-sesion.interfaces';
import { environments } from '../../../environments/environments';
import { Usuario } from '../../usuario/interfaces/usuario.interfaces';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthEstado } from '../interfaces/auth-estado.enum';
import { RespuestaError } from '../../shared/interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  
  private readonly url: string = environments.urlServido

  http = inject(HttpClient)

  private _usuarioActual = signal<UsuarioAutentificado | null>(null)
  private _authEstatus = signal<AuthEstado>( AuthEstado.revisando )

  private _url = `${ this.url }/autentificacion/`

  constructor() {
        this.revisarEstadoAutentificacion().subscribe()
  }
  public iniciarSesion(iniciarSesion: IniciarSesion): Observable<IniciarSesionRespuesta | RespuestaError>{
    return this.http.post<IniciarSesionRespuesta>(`${ this._url }/iniciar-sesion`, iniciarSesion)
    .pipe(
      tap( ( { UsuarioId, Token} ) => {
        this._usuarioActual.set({ UsuarioId })
        this._authEstatus.set( AuthEstado.autorizado )
        localStorage.setItem('token', Token)
      }),
      catchError(error => {
        return throwError( () => error.error.message)
      })
    )
  }

  public revisarEstadoAutentificacion() : Observable<boolean> {
    const token = localStorage.getItem('token')

    if(!token) return of(false)

      const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`)

      return this.http.get(`${this._url}/private`, { headers })
      .pipe(
        map( res => {
          
          console.log( res )
          return true
        }),
        catchError( err => {
          console.log( err )
          this._authEstatus.set( AuthEstado.noAutorizado )
          return of(false)
        })
      )

    return of(false)
  }

  //Las señales computadas no se pueden modificar
  public usuarioActual = computed( () => this._usuarioActual() )
  public authEstado = computed( () => this._authEstatus() )
}
