import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private subject: Subject<string> = new Subject<string>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = new WebSocket('ws://localhost:8080');
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (messageEvent: MessageEvent) => {
      this.subject.next(messageEvent.data);
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log('WebSocket closed:', event);
      setTimeout(() => this.connect(), 5000); // Reconnect after 5 seconds
    };

    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: any): void {
    this.socket.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }

  getMessages(): Observable<string> {
    return this.subject.asObservable();
  }
}
