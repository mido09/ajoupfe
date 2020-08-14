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
    this.socket = io("http://193.46.198.9:1300");
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
