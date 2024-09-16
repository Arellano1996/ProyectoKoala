import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isUUID } from 'validator';
import { LetrasService } from '../service/letras.service';
import { Letra } from '../interfaces/letras.interfaces';
import { CrearLetraCancion } from '../../canciones/interfaces/crear.cancion.interfaces';
import { ObtenerColorService } from '../service/obtener-color.service';
import { LetraLiveService } from '../../letra-live/services/letra-live.service';
import { RespuestaRecibirLetraLive } from '../../letra-live/interfaces/EnviarLetraLive.interface';
import { concatMap } from 'rxjs';
import { TransportarCancionService } from '../service/transportar-cancion.service';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styles: ``
})
export class LetraComponent {

  esLetraLive: boolean = false

  letra: Letra = {
    LetraId: '',
    Letra: '',
    Tono: '',
    Usuario: undefined,
    Comentarios: [],
    Configuraciones: []
  };
  cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }

  uuid: string | null = '';
  uuidValido: Boolean = false;
  
  private letrasService = inject(LetrasService);
  private route = inject(ActivatedRoute);
  private colorService = inject(ObtenerColorService)
  private letraLiveService = inject(LetraLiveService)
  private transportarLetraService = inject(TransportarCancionService)

ngOnInit(): void {
  this.uuid = this.route.snapshot.paramMap.get('id');
  this.uuidValido = isUUID(this.uuid!)
  
  if(!this.uuidValido) return

  this.letrasService.getLetraPorId(this.uuid!)
  .pipe(
    concatMap(letra => {
      if (letra != null) {
        this.letra = letra;
        const parsedLetra: CrearLetraCancion = JSON.parse(letra.Letra);
        this.cancion = parsedLetra;
        this.cancion.Tono = this.letra.Tono;
      }
      // Ejecutar la segunda petición después de la primera
      return this.letraLiveService.obtenerLetraLiveSQL();
    })
  )
  .subscribe(res => {
    if (res) {
      this.esLetraLive = res.LetraId === this.uuid;
      //Obtenermos el tono de la letra Live
      const tonoLive = res.Tono
      //Tomamos el tono de la letra en base de dato
      const tonoSQL = this.transportarLetraService.obtenerValorTono(this.cancion.Tono)
      //Transportamos la cancion a la tonalidad que marca el LetraLive
      if(tonoLive != tonoSQL){
        const valorTransportar = tonoLive - tonoSQL!
        this.transportarLetraService.transportarCancion(this.cancion, valorTransportar!)
      }
    }
  });


  //Suscribe para escuchar servidor Socket
  this.letraLiveService.recibirLetra()
  .subscribe( ( res: RespuestaRecibirLetraLive  ) => {
    this.esLetraLive = res.LetraId === this.uuid
    console.log('Se recibieron datos: ', res.Tono)
  }
  )
}

obtenerColor(codigo: string){
  return this.colorService.obtenerColor(codigo)
}

}
