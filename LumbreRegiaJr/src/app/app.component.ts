import { Component, inject, OnInit } from '@angular/core';
import { AlertNotification, NotificationType } from './shared/mensaje-emergente/interfaces/mensaje-alerta.interfaces';
import { MensajeEmergenteService } from './shared/mensaje-emergente/mensaje-emergente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Proyecto Koala';
  background = 'bg-blue-400'
  

  //Mensaje emergente
  showAlert: boolean = false;
  alertNotification: AlertNotification = {
    notificationType: NotificationType.Success,
    message: '',
    time: 0
  }
  private notificationService = inject(MensajeEmergenteService);

  
  ngOnInit(): void{

    this.notificationService.alert$.subscribe(
      ( res: any ) => {
      //console.log( res );
      //Copia la información necesaria para mostrar el mensaje
      this.alertNotification = res;
      //Activamos el mensaje
      this.showAlert = true;

      //Timer para ocultar el mensaje
      setTimeout( () => {
        this.showAlert = false;
      }, this.alertNotification.time);

    })

  }
}
