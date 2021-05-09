import { Message } from 'src/app/messages/message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messages: Message[] = [
    new Message(2, "Project Submission", "I want to send you my project. Here it is. Thanks!", "Johnny Does"),
    new Message(3, "Awesome Projects", "Hey! Here's a website of web project ideas.", "Cool Devs"),
    new Message(4, "Assignment Help", "Help! I can't figure out how to pass data to different components.", "Mr. Woe")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
