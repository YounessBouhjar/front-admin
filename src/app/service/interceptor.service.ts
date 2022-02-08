import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('basicauth')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('basicauth'),

        },
      });
    }

    return next.handle(req);
  }
}