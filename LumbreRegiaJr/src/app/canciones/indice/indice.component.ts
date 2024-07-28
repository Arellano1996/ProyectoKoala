import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CancionResponse } from '../interfaces/canciones.interfaces';
import { CancionesService } from '../services/canciones.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrl: './indice.component.css'
})
export class IndiceComponent extends AppComponent implements OnInit {
  
  public cancionesReponse: CancionResponse = { Canciones: [], Total: 0 };
  

  constructor(private cancionesService: CancionesService,
  ) {
    super()
    
   }

  ngOnInit(): void {
    this.cancionesService.getCanciones()
    .subscribe( res => {
      this.cancionesReponse = res;
      console.log(res)
    })
  
  }



}
