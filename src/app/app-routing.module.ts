import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { SelectPaymentMethodComponent } from './select-payment-method/select-payment-method.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasketSuccessComponent } from './basket/success/basket-success.component';
import { OcrIframeComponent } from './select-payment-method/ocr-iframe/ocr-iframe.component';
import { CardSaveSuccessComponent } from './select-payment-method/card-save-success/card-save-success.component';
import { CardSaveErrorComponent } from './select-payment-method/card-save-error/card-save-error.component';

const routes: Routes = [
  {path: 'basket', component: BasketComponent},
  {path: 'basket/success', component: BasketSuccessComponent},
  {path: 'select-payment-method', component: SelectPaymentMethodComponent},
  {path: 'select-payment-method/ocr-iframe', component: OcrIframeComponent},
  {path: 'select-payment-method/card-save-success', component: CardSaveSuccessComponent},
  {path: 'select-payment-method/card-save-error', component: CardSaveErrorComponent},
  {path: '', redirectTo: '/basket', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
