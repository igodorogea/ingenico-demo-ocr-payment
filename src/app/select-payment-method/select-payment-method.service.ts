import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class SelectPaymentMethodService {
  httpOptions = {
    headers: new HttpHeaders({
      'Accept':  'application/json',
      'Content-Type':  'application/json',
      'Authorization': appConfig.authToken,
      'App-Code': appConfig.appCode
    })
  };
  constructor(private http: HttpClient) { }

  getOcrIframeUrl() {
    return this.http.post('/api/muume/creditCard/ocr', null, this.httpOptions);
  }
}
