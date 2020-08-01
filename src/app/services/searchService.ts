import { UserService } from './user.service';
import { ClientService } from './client.service';
import { User } from './../models/user';
import { Client } from './../models/client';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$ = this._loading$.asObservable();
  private _clients$ = new BehaviorSubject<Client[]>([]);
  clients$ = this._clients$.asObservable();
  private _users$ = new BehaviorSubject<User[]>([]);
  users$ = this._users$.asObservable();
  private _search$ = new Subject<void>();
  private _searchTerm: string = '';
  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
    this._search$.next();
  }
  get searchTerm() {
    return this._searchTerm;
  }
  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._clients$.next(result.clients);
        this._users$.next(result.users);
      });
  }
  private _search() {
    const clients = this.clientService.search(this.searchTerm);
    const users = this.userService.search(this.searchTerm);
    return of({ users, clients });
  }
}
