import { Component, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NotificationType } from './interfaces/mensaje-alerta.interfaces';

@Component({
  selector: 'app-mensaje-emergente',
  templateUrl: './mensaje-emergente.component.html',
  styles: ``
})
export class MensajeEmergenteComponent extends AppComponent {
// success error warning
@Input() notificationType: NotificationType = NotificationType.Success;
@Input() message: string = '';

}
