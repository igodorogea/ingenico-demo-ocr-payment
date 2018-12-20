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
          'Authorization': 'fe162dfb-04ea-41b7-b89f-251aed44bcce',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
