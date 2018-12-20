import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent {
  @Input() iframeUrl;
  @Output() load = new EventEmitter();

  iframeLoaded(iframe: HTMLIFrameElement) {
    console.log('iframeLoaded', iframe);
    try {
      if (iframe.contentWindow.location.href) {
        this.load.emit(iframe.contentWindow.location.href);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
