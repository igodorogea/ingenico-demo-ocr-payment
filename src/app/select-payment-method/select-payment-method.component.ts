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
    // this.spmService.getOcrIframeUrl().subscribe(url => {
    //   this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // });
  }

  openIframe() {
    this.spmService.getOcrIframeUrl().subscribe(url => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.showIframe = true;
    });
  }

  iframeLoaded() {
    alert('iframe loaded');
  }
}
