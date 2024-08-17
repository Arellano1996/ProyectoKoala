import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isUUID } from 'validator';
import { LetrasService } from '../service/letras.service';
import { Letra } from '../interfaces/letras.interfaces';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styles: ``
})
export class LetraComponent {

  letra!: Letra;

  uuid: string | null = '';
  uuidValido: Boolean = false;
  
  private letrasService = inject(LetrasService);
  private route = inject(ActivatedRoute);


ngOnInit(): void {
  this.uuid = this.route.snapshot.paramMap.get('id');
  this.uuidValido = isUUID(this.uuid!)
  
  if(!this.uuidValido) return

  this.letrasService.getLetraPorId(this.uuid!)
  .subscribe( letra => {
    //console.log(artistas)
    if(letra != null){
      this.letra = letra
      console.log( this.letra )
    }
  });
}

}
