import { Component } from '@angular/core';
import { ArtistasService } from '../services/artistas.service';
import { Artista } from '../interfaces/artistas.interface';
import { ActivatedRoute } from '@angular/router';
import { isUUID } from 'validator'


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: ``
})
export class ArtistaComponent {

  public artistaResponse: Artista = { ArtistaId: '', Nombre: '', Slug: '' };
  uuid: string | null = '';
  uuidValido: Boolean = false;

  constructor(private artistasService: ArtistasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.uuidValido = isUUID(this.uuid!)
    
    if(!this.uuidValido) return

    this.artistasService.getArtistaPorId(this.uuid!)
    .subscribe( artistasResponse => {
      //console.log(artistas)
      if(artistasResponse != null){
        //this.artistaResponse = artistasResponse
        console.log('asd')
        this.artistaResponse = artistasResponse
        console.log(this.artistaResponse)
      }
    });
  }
}
