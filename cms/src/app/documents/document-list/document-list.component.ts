import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document(1, 'Brother Harris', 'Thank you for all your support in the class. You\'re awesome!', 'mypage.com/thankyou', []),
    new Document(12, 'Hey, person!', 'This contains a greeting.', 'mypage.com/hi', []),
    new Document(13, 'Top Secret', 'This is for secret agent eyes only.', 'mypage.com/secret', []),
    new Document(45, 'Best burgers in town', '...are the ones you make in your own kitchen.', 'mypage.com/burger', []),
    new Document(86, 'CIT Assignment', 'Lots of homework.', 'mypage.com/homework', [])
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
