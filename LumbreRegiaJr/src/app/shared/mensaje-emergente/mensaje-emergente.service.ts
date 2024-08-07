import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationType } from './interfaces/mensaje-alerta.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MensajeEmergenteService {

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  showAlert(notificationType: NotificationType, message: string, time: number = 5000) {

    const alertNotification = {
      notificationType,
      message,
      time
    }
    this.alertSource.next( alertNotification );

  }

}
