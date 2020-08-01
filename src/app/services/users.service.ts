import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private UsersSubject$ = new BehaviorSubject<User[]>([]);
  users$:Observable<User[]> = this.UsersSubject$.asObservable()

  constructor() {}
}
