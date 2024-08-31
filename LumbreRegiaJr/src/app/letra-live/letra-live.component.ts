import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-letra-live',
  templateUrl: './letra-live.component.html',
  //styleUrl: './letra-live.component.css'
})
export class LetraLiveComponent implements OnInit {
  
  webSocketService = inject(WebsocketService)

  ngOnInit(): void {
  }
  
}
