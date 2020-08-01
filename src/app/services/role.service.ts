import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private rolesSubject$ = new BehaviorSubject<Role[]>([]);
  roles$: Observable<Role[]> = this.rolesSubject$.asObservable();
  rolesA: { name: string; deletable: boolean; }[];

  // private currentSubject$ = new BehaviorSubject<Role>(null);
  // current$ = this.currentSubject$.asObservable();

  get roles() {
    return this.rolesSubject$.value;
  }
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private http: HttpClient
  ) {
    // accountService.loginUser$.subscribe((admin) => {
    //   if (admin) {
    //     this.http
    //       .get<Role[]>(`${environment.apiUrl}/listRoles`)
    //       .pipe(map((roles) => roles.map((role) => new Role(role))))
    //       .subscribe((roles) => {
    //         this.rolesSubject$.next(roles);
    //       });
    //   } else {
    //     this.rolesSubject$.next([]);
    //   }
    // });
    this.rolesA = [
      { name: '12', deletable: true },
      { name: '22', deletable: true },
      { name: '32', deletable: true },
      { name: '42', deletable: true },
    ];
    this.rolesSubject$.next(this.rolesA);
  }
}
