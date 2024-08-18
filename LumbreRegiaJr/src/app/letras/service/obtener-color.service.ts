import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerColorService {

obtenerColor(codigo: string){
  if(codigo === '1') return 'text-yellow-600'
  return 'text-black'
}

}
