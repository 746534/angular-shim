import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class AdminUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public adminService: AdminService
  ) {
    route.data.subscribe((data: User) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }
}
