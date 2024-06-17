import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 导入CommonModule
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule], // 添加CommonModule到imports中
  template: `
    <div class="chat-room">
      <h2>Chat Room</h2>
      <ul class="message-list">
        <li *ngFor="let message of messages">{{ message }}</li>
      </ul>
      <input [(ngModel)]="newMessage" placeholder="Type your message">
      <button (click)="sendMessage()">Send</button>
    </div>
  `,
  styleUrls: ['./chat.component.scss'] // 添加样式文件
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.websocketService.getMessages().subscribe({
      next: (message) => {
        console.log('Received message in component: ', message);
        this.messages.push(message);
      },
      error: (err) => console.error('Error: ', err),
      complete: () => console.log('Connection Closed')
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.websocketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
