import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  contacts: Contact[] = [];

  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    this.http.get('https://cms-project-63929-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts
        this.maxContactId = this.getMaxId();
        this.contacts.sort();
        this.contactListChangedEvent.next(this.contacts.slice());
      }, 
      (error: any) => {
        console.log(error.message);
      }
    )
    return this.contacts.slice();
  }

  storeContacts() {
    const json = JSON.stringify(this.contacts);
    this.http.put(
      'https://cms-project-63929-default-rtdb.firebaseio.com/contacts.json', 
      json, 
      {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
    ). subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
    })
  }

  // Get contact by ID
  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;
  
    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    
    return maxId;
    }
  }
    
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
      }
  
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }
  
  deleteContact(contact: Contact) { 
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   // this.contactListChangedEvent.next(this.contacts.slice());
   this.storeContacts();

  }


}
