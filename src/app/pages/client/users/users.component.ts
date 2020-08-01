import { ClientService } from 'src/app/services/client.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TableEvent } from 'src/app/components/table/table.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[];
  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private router: Router
  ) {
    userService.users$.subscribe((users) => {
      //TODO 需要通过router路径中的clientId进行过滤clientId
      this.users = users;
      console.log(this.users)
    });
  }

  tableEvent(tableEvent: TableEvent) {
    if (tableEvent.dataType == 'user') {
      if (tableEvent.eventType == 'select') {
        this.router.navigate([
          `/clients/${this.clientService.current.uid}/users/${tableEvent.data.uid}`,
        ]);
      }
      if (tableEvent.eventType == 'update') {
        //TODO http请求
      }
    }
  }
}
