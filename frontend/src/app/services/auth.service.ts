import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(
      'http://localhost:3000/users/register',
      user,
      httpOptions
    );
  }

  authenticateUser(user: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/users/auth',
      user,
      httpOptions
    );
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  logout() {
    this.user = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    };
    localStorage.clear();
  }
}
