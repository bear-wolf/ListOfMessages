import { Injectable } from '@angular/core';
import {User} from './user-model';

@Injectable()
export class UserService {

  private user: Array<User> = [];

  constructor() { }

  getAll() {
    return this.user;
  }

  save(data: User) {
    this.user.push(data);
  }

}
