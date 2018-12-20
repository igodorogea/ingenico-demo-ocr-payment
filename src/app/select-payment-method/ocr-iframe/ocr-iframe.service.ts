import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class OcrIframeService {
  constructor(private apiSvc: ApiService) { }

  getOcrServiceUrl(): Observable<string> {
    return this.apiSvc.getAddCreditCardOcrUrl();
      // .pipe(map(ocrUrl => {
      //   // const returnUrl = new URL('/select-payment-method/card-save-success', window.location.href);
      //   // const url = new URL(ocrUrl, /^https?:\/\//i.test(ocrUrl) ? '' : window.location.href);
      //   // url.searchParams.set('is-ocr-payment', '1');
      //   // url.searchParams.set('return-url', returnUrl.href);
      //   // return url.href;
      // }));
  }
}
