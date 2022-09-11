import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const id_token = localStorage.getItem('id_token');

    if (id_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${id_token}`,
        },
      });
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
