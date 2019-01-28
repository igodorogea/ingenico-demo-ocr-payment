import { Component, OnInit } from '@angular/core';
import { CardSaveSuccessService } from './card-save-success.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-save-success',
  templateUrl: './card-save-success.component.html',
  styleUrls: ['./card-save-success.component.scss']
})
export class CardSaveSuccessComponent implements OnInit {
  iframeUrl;

  constructor(private sanitizer: DomSanitizer, private cscService: CardSaveSuccessService, private router: Router) { }

  ngOnInit() {
    this.cscService.getInitPaymentUrl().subscribe(
      url => {
        if (url) {
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
          this.router.navigate(['/select-payment-method/card-save-error']);
        }
      },
      error => {
        console.log(error);
        this.router.navigate(['/select-payment-method/card-save-error', {error}]);
      }
    );
  }

  iframeLoaded(url) {
    if (url.indexOf('/ingenico/success') !== -1) {
      this.router.navigate(['/basket/success']);
    }
  }
}
