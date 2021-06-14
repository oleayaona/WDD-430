import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  // @ViewChild('form') editForm: NgForm;
  editForm: FormGroup;

  originalDocument: Document;
  document: Document;
  editMode = false;
  id: number;

  subscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(this.id.toString());

          if (!this.originalDocument) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      )
  }


  onSubmit(form: NgForm){
    const value = form.value;
    const newDocument = new Document(this.documentService.getMaxId().toString(), value.name, value.description, value.url, []);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../documents']);
  }

}
