import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class MuumeHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/muume') === 0) {
      req = req.clone({
        setHeaders: {
          'App-Code': 'ingenicoSDK',
          'Authorization': 'fe6478bb-9bc7-4054-8983-94ce7b43f710',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
