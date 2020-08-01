import { ClientService } from 'src/app/services/client.service';
import { Client } from './../../../models/client';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService
  ) {
    console.log(route.data);
    route.data.subscribe((data: { client: Client }) => {
      console.log(data);
      console.log(data.client);
    });
  }

  ngOnInit() {}
}
