import { Admin } from './../../models/admin';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  dialogVisible: boolean;
  constructor(public adminService: AdminService, public router: Router) {}

  ngOnInit() {
  }

  showDialog() {
    this.dialogVisible = true;
  }
  tableEvent(val) {
    console.log(val);
    if (val.dataType === 'admin') {
      this.router.navigate([`admins/${val.data.uid}`]);
    }
  }
}
