import { Component, OnInit } from '@angular/core';
import { ArtistaResponse } from '../interfaces/artistas.interface';
import { ArtistasService } from '../services/artistas.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styles: ``
})
export class IndiceComponent implements OnInit{

  public artistaResponse: ArtistaResponse = { Artistas: [], Total: 0 };

  constructor(private artistasService: ArtistasService) { }
  
  ngOnInit(): void {
    this.artistasService.getArtistas()
    .subscribe( artistasResponse => {
      //console.log(artistas)
      this.artistaResponse = artistasResponse
      console.log( this.artistaResponse)

    });

  }
}
