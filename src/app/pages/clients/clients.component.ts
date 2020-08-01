import { TableEvent } from './../../components/table/table.component';
import { ClientService } from '../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  constructor(public router: Router, public clientService: ClientService) {}

  tableEvent(tableEvent: TableEvent) {
    console.log(tableEvent);
    switch (tableEvent.eventType) {
      case 'select':
        if (tableEvent.dataType === 'client') {
          this.router.navigate([`clients/${tableEvent.data.uid}`]);
        }
        if (tableEvent.dataType === 'user') {
          this.router.navigate([
            `clients/${tableEvent.data.clientUid}/users/${tableEvent.data.userUid}`,
          ]);
        }
        break;
      case 'update':
        //TODO http请求
        this.clientService;
        break;
    }
  }
}
