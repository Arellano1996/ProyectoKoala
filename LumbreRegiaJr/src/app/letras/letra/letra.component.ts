import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isUUID } from 'validator';
import { LetrasService } from '../service/letras.service';
import { Letra } from '../interfaces/letras.interfaces';
import { FormatearLetraService } from '../../canciones/services/formatear-letra.service';
import { CrearLetraCancion } from '../../canciones/interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styles: ``
})
export class LetraComponent {

  letra!: Letra;
  cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }

  uuid: string | null = '';
  uuidValido: Boolean = false;
  
  private letrasService = inject(LetrasService);
  private route = inject(ActivatedRoute);
  private formatearLetra = inject(FormatearLetraService)

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
    }
  });
}

}
