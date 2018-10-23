import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  payment: Payment;
  paymentRet: Observable<Payment>;

  @Output() paymentSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private notification: NotificationService) {
  }

  ngOnInit() {
    this.payment = new Payment('', '', '', '', 1000);

    this.paymentForm = this.fb.group({
      bSB: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12,16}$/)]],
      accountName: ['', Validators.required],
      reference: ['', [Validators.required, Validators.pattern(/^[0-9]{11,18}$/)]],
      paymentAmount: ['', [Validators.required, Validators.pattern(/^\$?\d+(,\d{3})*(\.\d*)?$/)]]
    });

    this.paymentForm.valueChanges.subscribe(f => {
      this.payment.bSB = f.bSB;
      this.payment.accountNumber = f.accountNumber;
      this.payment.accountName = f.accountName;
      this.payment.reference = f.reference;
      this.payment.paymentAmount = f.paymentAmount;
    });
  }

  onSubmit(payment) {
    this.paymentRet = this.paymentService.saveToServer(payment);
    this.paymentRet.subscribe(
      (data: Payment) => {
        const pay = JSON.stringify(data);
        this.notification.showSuccess(`Your payment ${pay} is successful`);
      },
      error => {
        console.log(error);
        this.notification.showError(error);
      }
    );

    this.paymentSubmitted.emit(payment.accountName);

    return this.paymentRet;
  }
}
