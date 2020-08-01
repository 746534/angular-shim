import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  items = [
    { label: 'Client', icon: 'pi pi-fw pi-chart-bar', routerLink: 'detail' },
    { label: 'Users', icon: 'pi pi-fw pi-calendar', routerLink: 'users' },
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
