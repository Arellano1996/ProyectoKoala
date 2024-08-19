import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerColorService {

obtenerColor(codigo: string){
  if(codigo === '1') return 'text-yellow-700'
  return 'text-black'
}

}
