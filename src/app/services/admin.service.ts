import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY, of } from 'rxjs';
import { Admin } from '../models/admin';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Resolve } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AdminService implements Resolve<Admin> {
  private adminSubject$ = new BehaviorSubject<Admin[]>([]);
  admin$: Observable<Admin[]> = this.adminSubject$.asObservable();

  private currentSubject$ = new BehaviorSubject<Admin>(null);
  current$ = this.currentSubject$.asObservable();
  get admins() {
    return this.adminSubject$.value;
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Admin> | Observable<never> {
    const id = route.paramMap.get('id');
    console.log(id);
    if (id != 'add') {
      const admin = this.admins.find((admin) => admin.uid === id);
      if (admin) {
        this.currentSubject$.next(admin);
        return of(admin);
      }
      this.currentSubject$.next(null);
      this.router.navigate(['/admin/add']);
    }
    return EMPTY;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private accountService: AccountService
  ) {
    // this.accountService.loginUser$.subscribe((loginUser) => {
    //   if (loginUser) {
    //     this.http.get<Admin[]>(`${environment.apiUrl}/getAdmin`)
    //       .pipe(
    //         map((admins) => {
    //         return admins.map((admin) => new Admin(admin));
    //         })
    //     ).subscribe(
    //       (admins) => {
    //         this.adminSubject$.next(admins);
    //       }
    //       )
    //   } else {
    //     this.adminSubject$.next([]);
    //   }
    // })

    this.adminSubject$.next([
      {
        uid: '1',
        sapId: '1',
        username: 'admin',
        password: '12345678',
        enabled: true,
      },
    ]);
  }
}
