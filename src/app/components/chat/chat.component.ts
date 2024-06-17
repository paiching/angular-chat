import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule], // 添加FormsModule到imports中
  template: `
    <div>
      <h2>Chat Room</h2>
      <div *ngFor="let message of messages">{{ message }}</div>
      <input [(ngModel)]="newMessage" placeholder="Type your message">
      <button (click)="sendMessage()">Send</button>
    </div>
  `,
  styles: []
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.websocketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.websocketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
