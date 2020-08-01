import { Component, Input, Output, EventEmitter } from '@angular/core';

class Client {
  uid: number;
  sapId: number;
  sName: string;
  name: string;
  email?: string;
  address?: string;
  enabled: boolean = true;
  constructor(init: Partial<Client>) {
    Object.assign(this, init);
  }
}
class User {
  uid: number;
  sapId: number;
  name: string;
  email?: string;
  address?: string;
  roles?: string[];
  client: Client[];
  enabled?: boolean = true;
  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
}
class Admin {
  uid: number;
  sapId: number;
  name: string;
  enabled?: boolean = true;
  constructor(init: Partial<Admin>) {
    Object.assign(this, init);
  }
}

type TableType = 'admin' | 'client' | 'user';
type ValueType = Admin | User | Client;
type EventType = 'select' | 'update';
export interface TableEvent {
  eventType: EventType;
  dataType: TableType;
  data: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  isAdmin: boolean = true;
  isClient: boolean = false;
  isUser: boolean = false;
  valueAll: any[] = [];
  userValue: any;

  private _tableType: TableType = 'admin';

  @Input() items: ValueType[];

  headers: string[] = ['Admins', 'Status'];

  @Input()
  set tableType(type: TableType) {
    console.log(type);
    switch (type) {
      case 'client':
        this.headers = ['Clients', 'Users', 'Status'];
        break;
      case 'user':
        this.headers = ['Users', 'Roles', 'Status'];
        break;
      case 'admin':
      default:
        break;
    }
    this.isAdmin = type == 'admin';
    this.isClient = type == 'client';
    this.isUser = type == 'user';
    this._tableType = type;
  }
  get tableType() {
    return this._tableType;
  }
  @Output() tableEvent = new EventEmitter<TableEvent>();
  selectRow(event: Event, item: ValueType) {
    this.tableEvent.emit({
      eventType: 'select',
      dataType: this.tableType,
      data: { uid: item.uid },
    });
  }
  selectUser(event: Event, item: ValueType, subItem: ValueType) {
    event.stopPropagation();
    this.tableEvent.emit({
      eventType: 'select',
      dataType: 'user',
      data: { userUid: subItem.uid, clientUid: item.uid },
    });
  }
  updateRow(event: Event, item: ValueType) {
    event.stopPropagation();
    this.tableEvent.emit({
      eventType: 'update',
      dataType: this.tableType,
      data: { uid: item.uid, enabled: !item.enabled },
    });
  }
}
