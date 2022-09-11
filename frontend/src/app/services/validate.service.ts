import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  // Checking if fields are not set
  validateRegister(user: any): boolean {
    if (user.firstName == undefined || user.firstName == '') {
      return false;
    } else if (user.lastName == undefined || user.lastName == '') {
      return false;
    } else if (user.username == undefined || user.username == '') {
      return false;
    } else if (user.email == undefined || user.email == '') {
      return false;
    } else if (user.password == undefined || user.password == '') {
      return false;
    } else {
      return true;
    }
  }

  // Validating e-mail with Regular Expressions 
  validateEmail(email: any): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
