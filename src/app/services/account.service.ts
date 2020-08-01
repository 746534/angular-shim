import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin';
import { map, delay, switchMap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private loginUserSubject$ = new BehaviorSubject<Admin>(null);
  loginUser$: Observable<Admin> = this.loginUserSubject$.asObservable();

  private tokenRenewTimer: any;

  get logUser(): Admin {
    return this.loginUserSubject$.value;
  }
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    if (storageService.tokenValid()) {
      const cachedLoginUser = this.storageService.getValue('loginUser');
      const timeLeftToExpire =
        Number(this.storageService.getValue('expiredAt')) - Date.now();
      this.renewToken(timeLeftToExpire);
      this.loginUserSubject$.next(cachedLoginUser);
    }
  }
  private renewToken(timeout: number = 55000) {
    clearTimeout(this.tokenRenewTimer);
    this.tokenRenewTimer = setTimeout(() => {
      this.http
        .post<string>(`${environment.apiUrl}/renewToken`, null)
        .subscribe((token) => {
          this.storageService.token = token;
          this.renewToken(55000);
        });
    }, timeout);
  }
  private getUserProfile() {
    return of(new Admin({ username: 'test', password: 'test' })).pipe(
      delay(500)
    );
    return this.http.post<Admin>(`${environment.apiUrl}/profile`, {}).pipe(
      map((admin) => {
        return new Admin(admin);
      })
    );
  }
  login(username: string, password: string) {
    // return this.http
    //   .post<string>(`${environment.apiUrl}/grantToken`, {
    //     username,
    //     password,
    //   })
    return of('faketoken').pipe(
      delay(500),
      /* 获取到*/
      map((token) => {
        console.log(token);
        this.storageService.token = token;
        this.renewToken(55000);
      }),
      /* 获取用户档案*/
      mergeMap(() => {
        return this.getUserProfile();
      }),
      map((admin) => {
        console.log(admin);
        this.storageService.setValue('loginUser', admin);
        this.loginUserSubject$.next(admin);
        return admin;
      })
    );
  }
  logout() {
    this.loginUserSubject$.next(null);
    this.storageService.clearToken();
    return of(null);
  }
}
