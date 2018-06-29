import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  payment: Payment;
  paymentRet: Observable<Payment>;

  constructor(private fb: FormBuilder, private paymentService: PaymentService, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.payment = new Payment('', '', '', '', 1000);

    this.paymentForm = this.fb.group({
      bSB: ['', [Validators.required, Validators.pattern(/^[a-z]{10}$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[a-z]{12,16}$/)]],
      accountName: ['', Validators.required],
      reference: ['', [Validators.required, Validators.pattern(/^[a-z]{11,18}$/)]],
      paymentAmount: ['', Validators.pattern(/^\$?\d+(,\d{3})*(\.\d*)?$/)]
    });

    this.paymentForm.valueChanges.subscribe(f => {
      this.payment.bSB = f.bSB;
      this.payment.accountNumber = f.accountNumber;
      this.payment.accountName = f.accountName;
      this.payment.reference = f.reference;
      this.payment.paymentAmount = f.paymentAmount;
    });
  }

  onSubmit(fClient) {
    this.paymentRet = this.paymentService.saveToServer(this.payment);
    this.paymentRet.subscribe(
      (data: Payment) => {
        // alert('Your payment is successful');
        this.snackBar.open('Your payment is successful', '', { duration: 3000 });
      },
      error => {
        console.log(error);
        // alert(error.message);
        this.snackBar.open(error.message, '', { duration: 3000 });
      }
    );
  }

}
