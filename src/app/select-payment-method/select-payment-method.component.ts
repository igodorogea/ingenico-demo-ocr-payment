import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.scss']
})
export class SelectPaymentMethodComponent {
  constructor(private router: Router) {
  }

  redirectToOcrServicePage() {
    this.router.navigate(['/select-payment-method/ocr-iframe']);
  }
}
