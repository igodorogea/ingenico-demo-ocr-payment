import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { SelectPaymentMethodComponent } from './select-payment-method/select-payment-method.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'basket', component: BasketComponent},
  {path: 'select-payment-method', component: SelectPaymentMethodComponent},
  {path: '', redirectTo: '/basket', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
