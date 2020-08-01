import { RoleService } from './../../../services/role.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class ClientUserComponent implements OnInit {
  constructor(public userService: UserService,
  public roleService:RoleService) {
    // userService.users$.subscribe((a) => {
    //   console.log(a)
      
    // })
  }
  
  ngOnInit() {}
}
