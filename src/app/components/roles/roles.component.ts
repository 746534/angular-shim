import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  value = {
    name: '',
    delete: true,
  };
  values = [
    {
      name: '123456',
      delete: true,
    },
    {
      name: '123456',
      delete: true,
    },
    {
      name: '123456',
      delete: true,
    },
  ];

  constructor() {}

  ngOnInit() {}
  add() {
    console.log(this.value.name);

  }
}
