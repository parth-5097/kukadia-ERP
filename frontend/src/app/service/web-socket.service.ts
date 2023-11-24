import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  id: any;

  constructor(private router: Router) {
    this.id = localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser')).id
      : sessionStorage.getItem('loginUser')
      ? JSON.parse(sessionStorage.getItem('loginUser')).id
      : undefined;

    if (this.id) {
      this.socket = io.io(environment.PORT_URL, {
        query: {
          user_id: this.id,
        },
        transports: ['websocket'],
        upgrade: false,
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  close() {
    this.socket.close();
    this.socket.removeAllListeners();
    this.socket = undefined;
  }
}
