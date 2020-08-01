import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from './../../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  list: any[] = [
    { name: 'Clients', url: 'clients' },
    { name: 'Roles', url: 'roles' },
    { name: 'Admins', url: 'admins' },
    { name: 'About', url: 'about' },
  ];

  toSearch() {
    this.router.navigate(['/search']);
  }
  search(){
    
  }
  ngOnInit() {}
  logout() {
    this.accountService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
