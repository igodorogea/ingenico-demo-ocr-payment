import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { SelectPaymentMethodComponent } from './select-payment-method/select-payment-method.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasketSuccessComponent } from './basket/success/basket-success.component';
import { CardSaveSuccessComponent } from './select-payment-method/card-save-success/card-save-success.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MuumeHttpInterceptor } from './shared/muume-http.interceptor';
import { OcrIframeComponent } from './select-payment-method/ocr-iframe/ocr-iframe.component';
import { IframeComponent } from './shared/iframe/iframe.component';
import { CardSaveErrorComponent } from './select-payment-method/card-save-error/card-save-error.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    SelectPaymentMethodComponent,
    PageNotFoundComponent,
    BasketSuccessComponent,
    CardSaveSuccessComponent,
    SpinnerComponent,
    OcrIframeComponent,
    IframeComponent,
    CardSaveErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MuumeHttpInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
