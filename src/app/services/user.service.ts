import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { AccountService } from './account.service';

// export type ResolveUser = { breadcrumb: string; user?: User };

@Injectable({ providedIn: 'root' })
export class UserService implements Resolve<User> {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject$.asObservable();

  private currentSubject$ = new BehaviorSubject<User>(null);
  current$ = this.currentSubject$.asObservable();
  get current() {
    return this.currentSubject$.value;
  }
  get users() {
    return this.usersSubject$.value;
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Observable<never> {
    const id = route.paramMap.get('id');
    console.log(id);
    if (id != 'add') {
      const user = this.users.find((user) => user.uid === id);
      if (user) {
        this.currentSubject$.next(user);
        return of(user);
        // return of({ user, breadcrumb: user.name });
      }
      this.currentSubject$.next(null);
      this.router.navigate(['./add']);
    }
    return EMPTY;
    // return of({ breadcrumb: 'Create New User' });
  }

  constructor(private router: Router, private accountService: AccountService) {
    this.accountService.loginUser$.subscribe((loginUser) => {
      /*只要登陆状态发生改变,user 列表均需要重置*/
      this.usersSubject$.next([]);
    });
  }
  search(searchTerm: string) {
    return this.users.filter((user) => user.hasKeyWord(searchTerm));
  }
  addUsers(users: User[]) {
    this.usersSubject$.next([...this.users, ...users]);
  }
}
