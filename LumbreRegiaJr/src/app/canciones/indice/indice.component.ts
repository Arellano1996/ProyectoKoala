import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CancionesResponse } from '../interfaces/canciones.interfaces';
import { CancionesService } from '../services/canciones.service';
import { AppComponent } from '../../app.component';
import { Configuracion } from '../../shared/services/interfaces/tabla-canciones.interfaces';
import { ConfiguracionPaginaService } from '../../shared/services/configuracion-pagina.service';
import { BuscarComponent } from './buscar/buscar.component';

@Component({
  selector: 'app-cancion-indice',
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent extends AppComponent implements OnInit {
  
  public cancionesReponse: CancionesResponse = { Canciones: [], Total: 0 };
  @ViewChild('buscar') buscarComponent!: BuscarComponent;
  configuracion: Configuracion;

  usuarioId = 'e26ccc45-caf4-4407-b7c0-a02705eb6cc9'

  constructor(private cancionesService: CancionesService,
    private configuracionPaginaService: ConfiguracionPaginaService
  ) {
    super()
    this.configuracion = this.configuracionPaginaService.obtenerConfiguracion();
  }
  
  override ngOnInit(): void {
    this.buscarCanciones()
  }

  buscarCanciones(termino?: string){
    if(termino)
    {
      if(this.configuracion.OcultarCancionesDeOtrosUsuarios)
        {
          this.cancionesService.getCancionesPorUsuarioIdYTermino(this.usuarioId, termino)
          .subscribe( res => {
            this.cancionesReponse = res;
          })
        }
        else
        {
          this.cancionesService.getCancionesPorTermino( termino )
          .subscribe( res => {
            this.cancionesReponse = res;
          })
        }
    }
    else
    {
      if(this.configuracion.OcultarCancionesDeOtrosUsuarios)
      {
        this.cancionesService.getCancionesPorUsuarioId(this.usuarioId)
        .subscribe({
          next: res => {
            this.cancionesReponse = res;
          },
          error: err => {
            window.alert(`Error: ${err.message}`);
          }
        })
      }
      else
      {
        this.cancionesService.getCanciones()
        .subscribe( res => {
          this.cancionesReponse = res;
        })
      }
    }
  }

  recibirOpcionesDeHijo(config: Configuracion): void {
    this.configuracion = config
  }

  onCheckboxChange(event: Event): void {
    //Limpiamos el elemento hijo input para buscar
    this.buscarComponent.limpiarDesdePadre()

    const inputElement = event.target as HTMLInputElement;
    //Actualizamos nuestra cofiguracion
    this.configuracion.OcultarCancionesDeOtrosUsuarios = inputElement.checked;

    //Llamamos al servicio para que guarde nuestra configuracion
    this.configuracionPaginaService.actualizarConfiguracion(this.configuracion)

    
    this.buscarCanciones()
  }

  recibirTermino(termino: string): void {
    this.buscarCanciones( termino )
  }

}
