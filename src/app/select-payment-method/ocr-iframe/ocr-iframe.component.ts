import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OcrIframeService } from './ocr-iframe.service';

@Component({
  selector: 'app-ocr-iframe',
  templateUrl: './ocr-iframe.component.html',
  styleUrls: ['./ocr-iframe.component.scss']
})
export class OcrIframeComponent implements OnInit {
  iframeUrl;

  constructor(private sanitizer: DomSanitizer, private ofSvc: OcrIframeService, private router: Router) { }

  ngOnInit() {
    this.ofSvc.getOcrServiceUrl().subscribe(url => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  iframeLoaded(url) {
    console.log(url);
    if (url.indexOf('/creditCard/success') !== -1) {
      this.router.navigate(['/select-payment-method/card-save-success']);
    }
  }
}
