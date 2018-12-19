import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

interface CardsAll {
  items: Card[];
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
    return this.http.post<OcrUrl>('/muume/creditCard/ocr', null)
      .pipe(map(({addCreditCardUrl}) => addCreditCardUrl));
  }

  getAllUserCards() {
    return this.http.get<{ items: Card[] }>('/muume/creditCard/all')
      .pipe(map(({items}) => items));
  }

  getOrder() {
    return this.http.post<{ order: Order }>('/muume/external-products/checkout', {
      'channelId': '5',
      'channelType': 'RETAIL_STORE',
      'items': [
        {
          'amount': 1000,
          'currency': 'EUR',
          'id': '10565',
          'imageUrl': 'https://demo-ingenico.muume.co/media/product/8/198/600_600_e91aa66e-7f72-48a5-924b-972cfbc3a9f4.jpeg',
          'options': [
            {
              'name': 'Lego',
              'value': 'City'
            }
          ],
          'pricePerUnit': 10.00,
          'productType': 'Scannable',
          'quantity': 1,
          'sku': 'lego-city',
          'status': 'AVAILABLE',
          'title': 'Lego',
          'type': 'HASH_CODE',
          'value': '33192191905490113253659725875460',
          'variationId': '1456'
        }
      ],
      'paymentMethod': 'UNDEFINED'
    })
      .pipe(map(({order}) => order));
  }

  getInitPaymentUrl(card: Card, order: Order) {
    return this.http.post<{ data: string }>('/muume/ingenico/url', <IngenicoPaymentUrlPayload>{
      amount: 1000,
      currency: 'EUR',
      ingenicoPaymentMethodId: card.paymentMethodId,
      muumeOrderId: order.id,
      tokens: [card.uuid]
    })
      .pipe(map(({data}) => data));
  }
}
