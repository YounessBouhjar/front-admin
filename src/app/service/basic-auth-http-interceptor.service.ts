import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('basicauth')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('basicauth'),
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
         "Access-Control-Allow-Methods":'GET, POST, PATCH, PUT, DELETE, OPTIONS'

        },
      });
    }
    return next.handle(req);
  }
}
