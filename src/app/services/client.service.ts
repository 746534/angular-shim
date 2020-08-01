import { v4 as uuid } from 'uuid';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { BehaviorSubject, Observable, of, forkJoin, EMPTY } from 'rxjs';
import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ClientService implements Resolve<Client> {
  private clientsSubject$ = new BehaviorSubject<Client[]>([]);
  clients$: Observable<Client[]> = this.clientsSubject$.asObservable();

  private currentSubject$ = new BehaviorSubject<Client>(null);
  current$ = this.currentSubject$.asObservable();
  get current() {
    return this.currentSubject$.value;
  }
  get clients() {
    return this.clientsSubject$.value;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> | Observable<never> {
    const id = route.paramMap.get('id');
    console.log(id);
    if (id != 'add') {
      const client = this.clients.find((client) => client.uid === id);
      if (client) {
        this.currentSubject$.next(client);
        return of(client);
      }
      this.currentSubject$.next(null);
      this.router.navigate(['/clients/add']);
    }
    return EMPTY;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private accountService: AccountService
  ) {
    this.accountService.loginUser$.subscribe((loginUser) => {
      console.log(loginUser)
      if (loginUser) {
        this.http
          .post<Client[]>('/listClients', {})
          .pipe(
            map((clients) => {
              console.log(clients)
              return clients.map((client) => new Client(client));
            }),
            tap((clients) =>
              forkJoin(
                clients.map((client) =>
                  this.http
                    .post<User[]>('/listUsers', { clientId: client.uid })
                    .pipe(map((users) => users.map((user) => new User(user))))
                    .subscribe((users) => {
                      client.users = users;
                      this.userService.addUsers(users);
                    })
                )
              )
            )
          )
          .subscribe((clients) => {
            this.clientsSubject$.next(clients);
          });
      } else {
        this.clientsSubject$.next([]);
      }
    });
    /*Test data only*/
    this.clientsSubject$.next(
      Array(Math.floor(Math.random() * 10))
        .fill(0)
        .map((_, _i) => {
          const uid = uuid();
          const users = Array(Math.floor(Math.random() * 10))
            .fill(0)
            .map((_, _i) => {
              return new User({
                uid: '123',
                name: 'Name',
                clientId: uid,
                roles: [
                  {
                    name: '22',
                    deletable:true
                  },
                ],
              });
            });
          this.userService.addUsers(users);
          return new Client({
            uid: uid,
            sapId: uuid(),
            name: 'A' + _i + 1,
            email: 'angular@111.cn',
            address: '北京',
            enabled: Math.random() > 0.5,
            users,
          });
        })
    );
  }
  search(searchTerm: string) {
    return this.clients.filter((client) => client.hasKeyWord(searchTerm));
  }
}
