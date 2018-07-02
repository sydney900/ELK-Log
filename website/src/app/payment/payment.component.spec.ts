import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { MaterialModule } from '../mat.module';
import { MatSnackBar } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment';
import { of } from 'rxjs';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentServiceSpy;
  let snackBarSpy;
  const mockPaymnet: Payment = {
    bSB: '123456',
    accountNumber: '1234567890123456',
    accountName: 'Bing',
    reference: '987654321012345',
    paymentAmount: 1000
  };


  beforeEach(async(() => {
    paymentServiceSpy = jasmine.createSpyObj('paymentService', ['saveToServer']);
    snackBarSpy = jasmine.createSpyObj('snackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: PaymentService, useValue: paymentServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;

        paymentServiceSpy.saveToServer.and.returnValue(of(mockPaymnet));

        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with all controls', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.paymentForm.get('bSB')).toBeTruthy();
      expect(component.paymentForm.contains('accountNumber')).toBe(true);
      expect(component.paymentForm.contains('accountName')).toBeTruthy();
      expect(component.paymentForm.contains('reference')).toBeTruthy();
      expect(component.paymentForm.contains('paymentAmount')).toBeTruthy();
    });
  });

  it('should make the BSB control required', () => {
    fixture.whenStable().then(() => {
      const ctl = component.paymentForm.get('bSB');

      ctl.setValue('');

      expect(ctl.valid).toBeFalsy();
    });
  });

  it('should make the BSB control invalid if not input 6 digit', () => {
    fixture.whenStable().then(() => {
      const ctl = component.paymentForm.get('bSB');

      ctl.setValue('123');
      expect(ctl.valid).toBeFalsy();
      expect(ctl.errors['pattern']).toBeTruthy();
    });
  });

  it('should make the BSB control invalid if input no digit', () => {
    fixture.whenStable().then(() => {
      const ctl = component.paymentForm.get('bSB');

      ctl.setValue('123abc');
      expect(ctl.valid).toBeFalsy();
      expect(ctl.errors['pattern']).toBeTruthy();
    });
  });

  it('should make the BSB control valid if inputed 6 digit', () => {
    fixture.whenStable().then(() => {
      const ctl = component.paymentForm.get('bSB');

      ctl.setValue('123456');
      expect(ctl.valid).toBeTruthy();
      expect(ctl.errors).toBeNull();
    });
  });

  it('should have called payment service after onSubmit', () => {
    component.paymentSubmitted.subscribe(() => {
      expect(paymentServiceSpy.saveToServer).toHaveBeenCalledWith(mockPaymnet);
      expect(snackBarSpy.open).toHaveBeenCalled();
    });
    component.onSubmit(mockPaymnet);
  });

  it('should have called payment service and notification after onSubmit', (done) => {
    component.onSubmit(mockPaymnet).subscribe(
      (r) => {
        expect(paymentServiceSpy.saveToServer).toHaveBeenCalledWith(mockPaymnet);
        expect(snackBarSpy.open).toHaveBeenCalled();
        expect(r).toBe(mockPaymnet);
        done();
      },
      error => {
        fail(error);
        done();
      });
  });


});
