import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Payment } from '../models/payment';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly PAYMENT_URL = '/api/payment';

  constructor(private http: HttpClient, private log: LogService) {
  }

  saveToServer(payment: Payment): Observable<Payment> {
    this.log.info(JSON.stringify(payment));

    return this.http.post<Payment>(this.PAYMENT_URL, payment)
      .pipe(
        catchError((error: HttpErrorResponse, caught: Observable<Payment>) => {
          const message = (error.error instanceof ErrorEvent) ?
            error.error.message : `server returned code ${error.status} with body "${error.error}"`;

          this.log.error(message);

          return throwError(error);
        }));
  }
}
