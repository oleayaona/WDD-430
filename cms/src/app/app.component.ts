import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  // Initialize documents to be the first page displayed
  selectedFeature = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
  }


}
