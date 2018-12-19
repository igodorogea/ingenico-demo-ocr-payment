import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class CardSaveSuccessService {
  constructor(private apiSvc: ApiService) { }

  getLastCreditCard() {
    return this.apiSvc.getAllUserCards()
      .pipe(map(cards => cards.sort((a, b) => b.updateTime - a.updateTime)))
      .pipe(map(sortedCards => sortedCards[0]));
  }

  getInitPaymentUrl() {
    // getLastCreditCard
    // get order
    return forkJoin(
      this.getLastCreditCard(),
      this.apiSvc.getOrder()
    )
      .pipe(switchMap(([card, order]) => this.apiSvc.getInitPaymentUrl(card, order)));
  }
}
