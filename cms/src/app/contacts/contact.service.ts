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
    this.http.get('http://localhost:3000/contacts')
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
    // make sure id of the new object is empty
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    newContact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData.message);
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.contacts.sort();
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
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

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
   this.http.put('http://localhost:3000/contacts/' + originalContact.id,
   newContact, { headers: headers })
   .subscribe(
     (response: Response) => {
       this.contacts[pos] = newContact;
       this.contacts.sort();
       this.contactListChangedEvent.next(this.contacts.slice());
     }
   );
  }
  
  deleteContact(contact: Contact) { 
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }

   // delete from database
   this.http.delete('http://localhost:3000/contacts/' + contact.id)
     .subscribe(
       (response: Response) => {
         this.contacts.splice(pos, 1);
         this.contacts.sort();
         this.contactListChangedEvent.next(this.contacts.slice());
       }
     );

  }


}
