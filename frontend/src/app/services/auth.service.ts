import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

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

  getProfile(): Observable<any> {
    return this.http.get('http://localhost:3000/users/profile', httpOptions);
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  isLoggedIn() {
    if (localStorage.getItem('id_token') == undefined) {
      return false;
    } else {
      return !helper.isTokenExpired(`${localStorage.getItem('id_token')}`);
    }
  }

  updateProfile(id: any, data: any): Observable<any> {
    let url = `http://localhost:3000/users/profile/${id}`;
    return this.http.put(url, JSON.stringify(data), httpOptions);
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
