import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectPaymentMethodService } from './select-payment-method.service';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.scss']
})
export class SelectPaymentMethodComponent {
  showIframe = false;
  iframeUrl;

  constructor(private sanitizer: DomSanitizer, private spmService: SelectPaymentMethodService) {
    this.spmService.getOcrIframeUrl().subscribe((resp: any) => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resp.addCreditCardUrl);
    });
  }

  openIframe() {
    this.showIframe = true;
    this.spmService.getOcrIframeUrl().subscribe((resp: any) => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resp.addCreditCardUrl);
    });
  }

  iframeLoaded() {
    // alert('iframe loaded');
  }
}
