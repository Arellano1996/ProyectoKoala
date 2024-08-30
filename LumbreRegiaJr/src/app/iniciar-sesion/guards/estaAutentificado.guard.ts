import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AutentificacionService } from '../services/autentificacion.service';
import { AuthEstado } from '../interfaces/auth-estado.enum';

export const estaAutentificadoGuard: CanActivateFn = (route, state) => {
  
  const url = state.url
  const router = inject(Router)
  const autentificacionServicio = inject(AutentificacionService)

  console.log(autentificacionServicio.authEstado())

  if( autentificacionServicio.authEstado() === AuthEstado.revisando ) return false
  if( autentificacionServicio.authEstado() === AuthEstado.autorizado ) return true
  
  
  router.navigateByUrl('/iniciar-sesion')

  return false
};
