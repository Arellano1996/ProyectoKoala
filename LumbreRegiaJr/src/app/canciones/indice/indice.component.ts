import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CancionResponse } from '../interfaces/canciones.interfaces';
import { CancionesService } from '../services/canciones.service';
import { AppComponent } from '../../app.component';
import { Configuracion } from '../../shared/services/interfaces/tabla-canciones.interfaces';
import { ConfiguracionPaginaService } from '../../shared/services/configuracion-pagina.service';
import { BuscarComponent } from './buscar/buscar.component';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent extends AppComponent implements OnInit {
  
  public cancionesReponse: CancionResponse = { Canciones: [], Total: 0 };
  @ViewChild('buscar') buscarComponent!: BuscarComponent;
  configuracion: Configuracion;

  constructor(private cancionesService: CancionesService,
    private configuracionPaginaService: ConfiguracionPaginaService
  ) {
    super()
    this.configuracion = this.configuracionPaginaService.obtenerConfiguracion();
  }
  
  ngOnInit(): void {
    this.buscarCanciones()
  }

  buscarCanciones(termino?: string){
    if(termino)
    {
      if(this.configuracion.OcultarCancionesDeOtrosUsuarios)
        {
          this.cancionesService.getCancionesPorUsuarioIdYTermino('160ef76b-ad5a-464a-ad73-514eb1d0c8ca', termino)
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
        this.cancionesService.getCancionesPorUsuarioId('160ef76b-ad5a-464a-ad73-514eb1d0c8ca')
        .subscribe( res => {
          this.cancionesReponse = res;
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
