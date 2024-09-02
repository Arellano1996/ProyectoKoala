import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isUUID } from 'validator';
import { LetrasService } from '../service/letras.service';
import { Letra } from '../interfaces/letras.interfaces';
import { CrearLetraCancion } from '../../canciones/interfaces/crear.cancion.interfaces';
import { ObtenerColorService } from '../service/obtener-color.service';
import { LetraLiveService } from '../../letra-live/services/letra-live.service';
import { RespuestaRecibirLetraLive } from '../../letra-live/interfaces/EnviarLetraLive.interface';

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

ngOnInit(): void {
  this.uuid = this.route.snapshot.paramMap.get('id');
  this.uuidValido = isUUID(this.uuid!)
  
  if(!this.uuidValido) return

  this.letrasService.getLetraPorId(this.uuid!)
  .subscribe( letra => {
    //console.log(artistas)
    if(letra != null){
      this.letra = letra
      const parsedLetra: CrearLetraCancion = JSON.parse(letra.Letra);
      this.cancion = parsedLetra
      this.cancion.Tono = this.letra.Tono
    }
  });

  this.letraLiveService.obtenerLetraLiveSQL()
  .subscribe( res => {
    if( res ) this.esLetraLive = res.LetraId === this.uuid
  })

  //Suscribe para escuchar servidor Socket
  this.letraLiveService.recibirLetra()
  .subscribe( ( res: RespuestaRecibirLetraLive  ) => {
    this.esLetraLive = res.LetraId === this.uuid
  }
  )
}

obtenerColor(codigo: string){
  return this.colorService.obtenerColor(codigo)
}

}
