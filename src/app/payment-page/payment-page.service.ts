import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardShemes } from './model/modelCardshemes';
import { SubmitPymentRequest, SubmitPymentResponse } from './model/Payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentPageService {
  url = {
    getCard:
      'https://uat3ds.2c2p.com/emv3ds/mockservice/masterdata/cardschemes',
    submitPaymit: 'https://uat3ds.2c2p.com/emv3ds/mockservice/payment',
  };
  constructor(private http: HttpClient) {}

  getCardschemes() {
    return this.http.get<CardShemes[]>(this.url.getCard);
  }

  submitPayment(req: SubmitPymentRequest) {
    return this.http.post<SubmitPymentResponse>(this.url.submitPaymit, req);
  }
}
