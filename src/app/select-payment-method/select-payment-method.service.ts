import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface OcrUrl {
  addCreditCardUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SelectPaymentMethodService {
  constructor(private http: HttpClient) { }

  getOcrIframeUrl(): Observable<string> {
    return this.http.post<OcrUrl>('/muume/creditCard/ocr', null)
      .pipe(map(resp => resp.addCreditCardUrl));
  }
}
