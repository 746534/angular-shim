import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Role {
  name: string;
  deletable?: boolean;
}
@Component({
  selector: 'app-roles-pick',
  templateUrl: './roles-pick.component.html',
  styleUrls: ['./roles-pick.component.css'],
})
export class RolesPickComponent {
  allRoles: string[] = [];

  enableRoles:Role[] = [];
  @Input() availableRoles:Role[]

  @Input() set AllRoles(allRoles:Role[]){
    this.enableRoles = allRoles.filter((data)=>{
      return data.name != this.availableRoles[0].name
    })
  }


  @Output() userRolesChange = new EventEmitter<Role[]>();
  rolesChange(event: any) {
    console.debug(event.items);
    console.debug(this.availableRoles);
    this.userRolesChange.emit(this.availableRoles);
  }
}
