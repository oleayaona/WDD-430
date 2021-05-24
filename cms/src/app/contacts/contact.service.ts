import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  // Get all contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
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

}
