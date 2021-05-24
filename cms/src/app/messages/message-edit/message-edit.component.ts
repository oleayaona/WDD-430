import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from 'src/app/messages/message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Olea';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subjectInput = this.subject.nativeElement.value;
    const msgTextInput = this.msgText.nativeElement.value;
    const newMessage = new Message('9', subjectInput, msgTextInput, '7');
    // this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

}
