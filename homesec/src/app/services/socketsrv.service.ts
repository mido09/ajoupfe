import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsrvService {


  socket;
  constructor() { }

  connectSocket(){
    this.socket = io("http://localhost:1300");
  }

  // HANDLER
  onNewMessage(eventName) {
      return Observable.create(observer => {
        this.socket.on(eventName, msg => {
          observer.next(msg);
        });
      });
    }
}
