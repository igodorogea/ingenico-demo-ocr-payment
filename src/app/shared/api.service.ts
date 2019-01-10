import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface OcrUrl {
  addCreditCardUrl: string;
}

interface Card {
  creditCardProvider: string;
  creditCardType: string;
  lastDigits: string;
  paymentMethodId: number;
  updateTime: number;
  uuid: string;
  validationAmount: number;
  validationStatus: string;
}

interface IngenicoPaymentUrlPayload {
  amount: number;
  confirmation: boolean;
  currency: string;
  hostedCheckoutId: string;
  ingenicoPaymentMethodId: number;
  muumeOrderId: number;
  notes: string;
  password: string;
  tokens: string[];
}

interface Order {
  amountSumGroup: any;
  creationTime: number;
  customerId: number;
  customerUUID: string;
  deleted: boolean;
  deliveryAmount: number;
  deliveryNote: string;
  deliveryVatTax: number;
  deliveryVatTaxValue: number;
  discount: number;
  id: number;
  legalDocuments: any;
  merchantHavePickupInStore: boolean;
  orderedProducts: any;
  otherTaxes: any;
  pickupInStore: boolean;
  qrCodeHash: string;
  qrCodeHashNumeric: string;
  shippingDetails: string;
  shownTips: boolean;
  status: string;
  taxesIncluded: boolean;
  termsAndConditionsLink: string;
  totalOtherTaxes: number;
  totalVat: number;
  transactionIds: number[];
  vatSumGroup: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAddCreditCardOcrUrl(): Observable<string> {
    return this.http.post<OcrUrl>('/muume/creditCard/ocr?isOcrPayment=1', null)
      .pipe(handleResponse(({addCreditCardUrl}) => addCreditCardUrl));
  }

  getAllUserCards() {
    return this.http.get<{ items: Card[] }>('/muume/creditCard/all')
      .pipe(handleResponse(({items}) => items));
  }

  getAllUserCarts() {
    return this.http.get<{ items: any }>('/muume/external-products/carts')
      .pipe(handleResponse(({items}) => items[0]));
  }

  getOrder() {
    return this.getAllUserCarts()
      .pipe(switchMap((cart: any) =>
        this.http.post<{ order: Order }>('/muume/external-products/checkout', {
          'channelId': cart.channel.id,
          'channelType': cart.channel.type,
          'items': cart.items,
          'paymentMethod': 'UNDEFINED'
        })
          .pipe(handleResponse(({order}) => order))
      ));
  }

  getInitPaymentUrl(card: Card, order: Order) {
    return this.http.post<{ data: string }>('/muume/ingenico/url', <IngenicoPaymentUrlPayload>{
      amount: 1000,
      currency: 'EUR',
      ingenicoPaymentMethodId: card.paymentMethodId,
      muumeOrderId: order.id,
      tokens: [card.uuid]
    })
      .pipe(handleResponse(({data}) => data));
  }
}

export function handleResponse(cb) {
  return map((resp: any) => {
    if (resp.status === 'ERROR') {
      throw new Error(resp.errorMessage);
    } else {
      return cb(resp);
    }
  });
}
