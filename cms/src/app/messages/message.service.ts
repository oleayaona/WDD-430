import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  messages: Message[] = [];

  constructor(private http: HttpClient) {  }

  getMessages(): Message[] {
    this.http.get('https://cms-project-63929-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages
        this.maxMessageId = this.getMaxId();
        this.messages.sort();
        this.messageChangedEvent.emit(this.messages.slice());
      }, 
      (error: any) => {
        console.log(error.message);
      }
    )
    return this.messages.slice();
  }

  storeMessages() {
    const json = JSON.stringify(this.messages);
    this.http.put(
      'https://cms-project-63929-default-rtdb.firebaseio.com/messages.json', 
      json, 
      {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
    ). subscribe(() => {
      this.messageChangedEvent.emit(this.messages.slice());
    })
  }

  getMessage(id: string): Message {
    for (let msg of this.messages) {
      if (msg.id == id) {
        return msg;
      }
    }
    return null;
  }

  // Add a new message from message-edit component
  // then, emit event to show the messages list has changed
  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }


  getMaxId(): number {
    let maxId: number = 0;
  
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    
    return maxId;
    }
  }

}
