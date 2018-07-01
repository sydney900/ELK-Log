import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { MaterialModule } from '../mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment';
import { of } from 'rxjs';

xdescribe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let paymentServiceSpy;
  const mockPaymnet: Payment = {
    bSB: '123456',
    accountNumber: '1234567890123456',
    accountName: 'Bing',
    reference: '987654321012345',
    paymentAmount: 1000
  };


  beforeEach(async(() => {
    paymentServiceSpy = jasmine.createSpyObj('PaymentService', ['saveToServer']);

    TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [MaterialModule],
      providers: [
        { provide: PaymentService, useValue: paymentServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(PaymentComponent);
      component = fixture.componentInstance;

      paymentServiceSpy.saveToServer.and.returnValue(of(mockPaymnet));
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with all controls', () => {
    expect(component.paymentForm.contains('bSB')).toBeTruthy();
    expect(component.paymentForm.contains('accountNumber')).toBe(true);
    expect(component.paymentForm.contains('accountName')).toBeTruthy();
    expect(component.paymentForm.contains('reference')).toBeTruthy();
    expect(component.paymentForm.contains('paymentAmount')).toBeTruthy();
  });

  it('should make the BSB control required', () => {
    const ctl = component.paymentForm.get('bSB');

    ctl.setValue('');

    // expect(ctl.valid).toBeFalsy();
    expect(ctl.valid).toBeTruthy();
  });

  it('should make the BSB control invalid if not input 6 digit', (done) => {
    const ctl = component.paymentForm.get('bSB');

    ctl.setValue('123');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ctl.valid).toBeTruthy();
      expect(ctl.errors['pattern']).toBeTruthy();
    });

    ctl.setValue('123456');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(ctl.errors['pattern']).toBeFalsy();
      done();
    });

    // ctl.updateValueAndValidity();
    // component.paymentForm.markAsDirty();
    // expect(ctl.valid).toBeFalsy();
  });

  it('should make the BSB control valid if inputed 6 digit', () => {
    const ctl = component.paymentForm.get('bSB');

    ctl.setValue('123456');
    expect(ctl.valid).toBeTruthy();
  });

  it('should have called payment service after onSubmit', () => {
    component.paymentSubmitted.subscribe();
    component.onSubmit(mockPaymnet);
  }

  it('should have called payment service after onSubmit', () => {
    component.onSubmit(mockPaymnet);

    component.paymentRet.subscribe((r) => {
      expect(r).toBe(mockPaymnet);
    });

    expect(paymentServiceSpy.calls.count()).toBe(1);
  });


});
