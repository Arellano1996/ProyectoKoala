import { Component, inject } from '@angular/core';
import { CancionesService } from '../services/canciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../interfaces/canciones.interfaces';
import { isUUID } from 'validator';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styles: ``
})
export class CancionComponent {

  private router = inject(Router)

  public cancionResponse: Cancion = { 
    CancionId: '',
    UsuarioId: '',
    Nombre: '',
    Slug: '',
    Tono: '',
    BPM: 0,
    Duracion: '',
    Artistas: [],
    Generos: [],
    Letras: []
  }
  uuid: string | null = '';
  uuidValido: Boolean = false;

  constructor(private cancionService: CancionesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.uuidValido = isUUID(this.uuid!)
    
    if(!this.uuidValido) return

    this.cancionService.getCancionesPorCancionId(this.uuid!)
    .subscribe( cancionResponse => {
      //console.log(artistas)
      if(cancionResponse != null){
        this.cancionResponse = cancionResponse
        //console.log( this.cancionResponse )
      }
    });
  }

  eliminarCancion(){
    this.cancionService.deleteBorrarCancion(this.uuid!, environments.usuarioArellano )
    .subscribe({
      next: res => { 
        this.router.navigate([`/canciones`])
      },
      error: res => { console.log( res )}
    })
  }

}
