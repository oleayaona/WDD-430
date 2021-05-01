import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // Attribute selector <div app-server></div>
  // selector: '[app-server]',
  // Class selector <div class="app-server"></div>
  // selector: '.app-server',
  templateUrl: './servers.component.html',
  // For inline HTML templates
  // template: `
  //     <app-server><app-server>
  //     <app-server><app-server>
  // `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = 'Test Server';
  serverCreated = false;
  // Array of servers created
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000) // 2 seconds
  }

  ngOnInit(): void {
  }

  // When button is clicked
  onCreateServer() {
    this.serverCreated = true;
    // add to servers array
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server " + this.serverName + "was created!";
  }

  // On input of server name
  onUpdateServerName(event: Event) {
    // Explicit casting to input element
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
