import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}
  validateRegister(user: User): boolean {
    if (
      user.firstName == undefined ||
      user.lastName == undefined ||
      user.username == undefined ||
      user.email == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: any): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
