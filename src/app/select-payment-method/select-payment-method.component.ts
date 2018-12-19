import { Component } from '@angular/core';
import { SelectPaymentMethodService } from './select-payment-method.service';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.scss']
})
export class SelectPaymentMethodComponent {
  showSpinner = false;
  constructor(private spmService: SelectPaymentMethodService) {
  }

  redirectToOcrServicePage() {
    this.showSpinner = true;
    this.spmService.getOcrServiceUrl().subscribe(url => window.location.href = url);
  }
}
