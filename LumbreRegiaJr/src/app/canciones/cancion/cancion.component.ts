import { Component, inject } from '@angular/core';
import { CancionesService } from '../services/canciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../interfaces/canciones.interfaces';
import { isUUID } from 'validator';

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
    this.cancionService.deleteBorrarCancion(this.uuid!, 'e26ccc45-caf4-4407-b7c0-a02705eb6cc9' )
    .subscribe({
      next: res => { 
        this.router.navigate([`/canciones`])
      },
      error: res => { console.log( res )}
    })
  }

}
