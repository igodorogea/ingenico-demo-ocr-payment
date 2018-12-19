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
  showIframe = false;
  iframeUrl;

  constructor(private sanitizer: DomSanitizer, private cscService: CardSaveSuccessService, private router: Router) { }

  ngOnInit() {
    this.cscService.getInitPaymentUrl().subscribe(url => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.showIframe = true;
    });
  }

  iframeLoaded(iframe: HTMLIFrameElement) {
    console.log('iframeLoaded', iframe);
    try {
      if (iframe.contentWindow.location.href.indexOf('/ingenico/success') !== -1) {
        this.router.navigate(['/basket/success']);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
