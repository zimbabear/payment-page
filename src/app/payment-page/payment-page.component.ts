import { Component } from '@angular/core';
import { CardShemes } from './model/modelCardshemes';
import { PaymentPageService } from './payment-page.service';
import { SubmitPymentRequest, SubmitPymentResponse } from './model/Payment';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent {
  cities: CardShemes[] = [];
  cardShemes: any;
  cardNumber: string = '';
  expiryDate: string = '';
  name: string = '';
  email: string = '';
  isSuccess: boolean = false;
  isFail: boolean = false;
  isSubmit: boolean = false;
  invoice!: any;
  message: string = '';

  constructor(private paymentPageService: PaymentPageService) {
    this.isValidForm();
  }

  ngOnInit() {
    this.paymentPageService.getCardschemes().subscribe({
      next: (res) => {
        console.log('The next value is: ', res);
        const result = res.filter((res) => {
          return (res.id === 1 || res.id === 2 ||res.id === 3 ||res.id === 5)
        })
        this.cities = result;
        console.log('result ', result);
        this.cardShemes = res[0];
      },
      error: (err) => {
        console.error('An error occurred :', err);
      },
    });
  }

  onSubmit() {
    if (this.isValidForm()) {
      console.log('Form Submitted!', {
        cardShemes: this.cardShemes,
        creditCardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        name: this.name,
        email: this.email,
      });
      let cardNumber = this.cardNumber.replace(/-/g, '');
      console.log('cardNumber',cardNumber);
      let req: SubmitPymentRequest = {
        cardSchemeId: this.cardShemes.id,
        cardNumber: cardNumber,
        expiry: this.expiryDate,
        name: this.name,
        email: this.email,
      };
      console.log('req',req);
      this.paymentPageService.submitPayment(req).subscribe({
        next: (res: SubmitPymentResponse) => {
          console.log('The next submitPayment value is: ', res);
          this.isSubmit = true;
          this.isSuccess = true;
          this.invoice = res.invoiceNo;
        },
        error: (err) => {
          this.message = err.error.message;
          this.isSubmit = true;
          this.isFail = true;
          console.error('An error submitPayment occurred :', err);
        },
      });
    } else {
      console.log('Form is invalid!');
    }
  }

  onSelectCardType() {
    this.cardNumber = '';
  }

  isValidForm(): boolean {
    if (
      !this.cardNumber ||
      !this.expiryDate ||
      !this.name ||
      !this.cardShemes
    ) {
      return false;
    } else {
      return true;
    }
  }
}
