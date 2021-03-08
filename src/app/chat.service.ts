import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000');

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private socket: Socket) { }

  joinRoom(data)
  {
      this.socket.emit('join',data);
  }


  sendMessage(data)
  {
      this.socket.emit('message',data);
  }


  newUserJoined()
  {
      let observable = new Observable<{data: any}>(observer=>{
          this.socket.on('new user joined', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }


  newMessageReceived(){
      let observable = new Observable<{data: any}>(observer=>{
          this.socket.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }
}
