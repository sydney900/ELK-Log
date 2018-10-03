import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { AppSettings } from '../common/app-settings';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends DataService<Payment> {
  constructor(http: HttpClient, log: LogService) {
    super(environment.PAYMENTURL || AppSettings.PAYMENT_URL, http, log, Payment);
  }

  saveToServer(payment: Payment): Observable<Payment> {
    return this.create(payment);
  }
}
