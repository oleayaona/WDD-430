import { Component } from "@angular/core";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    // Inline styling
    styles: [`
        .online {
            color: white;
        }
    `]
})
export class ServerComponent { 
    serverId = 2341;
    serverStatus = 'offline';

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getColor() {
        return this.serverStatus === 'online' ? '#60b87a' : '#bb5252';
    }
}