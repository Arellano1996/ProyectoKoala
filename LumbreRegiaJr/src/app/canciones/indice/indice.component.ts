import { Component, OnInit } from '@angular/core';
import { CancionResponse } from '../interfaces/canciones.interfaces';
import { CancionesService } from '../services/canciones.service';
import { AppComponent } from '../../app.component';
import { Configuracion } from '../../shared/services/interfaces/tabla-canciones.interfaces';
import { ConfiguracionPaginaService } from '../../shared/services/configuracion-pagina.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent extends AppComponent implements OnInit {
  
  public cancionesReponse: CancionResponse = { Canciones: [], Total: 0 };
  
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

  buscarCanciones(){
    if(this.configuracion.OcultarCancionesDeOtrosUsuarios){
      this.cancionesService.getCancionesPorUsuarioId('160ef76b-ad5a-464a-ad73-514eb1d0c8ca')
      .subscribe( res => {
        this.cancionesReponse = res;
      })
    }
    else{
      this.cancionesService.getCanciones()
      .subscribe( res => {
        this.cancionesReponse = res;
      })
    }
  }

  recibirOpcionesDeHijo(config: Configuracion): void {
    this.configuracion = config
  }

  onCheckboxChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    //Actualizamos nuestra cofiguracion
    this.configuracion.OcultarCancionesDeOtrosUsuarios = inputElement.checked;

    //Llamamos al servicio para que guarde nuestra configuracion
    this.configuracionPaginaService.actualizarConfiguracion(this.configuracion)

    
    this.buscarCanciones()
  }

}
