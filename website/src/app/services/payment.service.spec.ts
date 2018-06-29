import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Payment } from '../models/payment';
import { LogService } from './log.service';

describe('PaymentService', () => {
  let injector: TestBed;
  let service: PaymentService;
  let httpMock: HttpTestingController;
  let mockPaymnet: Payment;
  let logServiceSpy;
  const mockError = 'Network error';

  beforeEach(() => {
    logServiceSpy = jasmine.createSpyObj('LogService', ['info', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService,
      {provide: LogService, useValue: logServiceSpy}
    ]
    });
    injector = getTestBed();
    service = injector.get(PaymentService);
    httpMock = injector.get(HttpTestingController);

    mockPaymnet = {
      bSB: '123456',
      accountNumber: '1234567890123456',
      accountName: 'Bing',
      reference: '987654321012345',
      paymentAmount: 1000
    };
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return correct result', () => {
    service.saveToServer(mockPaymnet).subscribe(
      (data: Payment) => {
        expect(data).toEqual(mockPaymnet);
      }
    );

    const req = httpMock.expectOne(`${service.PAYMENT_URL}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPaymnet);
  });

  it('should call log info function when saveToServer be called', () => {
    service.saveToServer(mockPaymnet).subscribe();

    expect(logServiceSpy.info).toHaveBeenCalled();
    const req = httpMock.expectOne(`${service.PAYMENT_URL}`);
    req.flush(mockPaymnet);
  });

  it('should be return error if request failed', (done) => {
   service.saveToServer(mockPaymnet).subscribe(
     (data: Payment) => {
       fail('Expected an error');
     },
     error => {
       console.log(error);
       expect(error.error.type).toBe(mockError);
       done();
     }
   );

   const req = httpMock.expectOne(`${service.PAYMENT_URL}`);
   expect(req.request.method).toBe('POST');
   req.error(new ErrorEvent(mockError));
 });

 it('should call debug and info function of log service if request failed', () => {
  service.saveToServer(mockPaymnet).subscribe(
    (data: Payment) => {
      fail('Expected an error');
    },
    error => {
      console.log(error);
      expect(error.error.type).toBe(mockError);
    }
  );

  expect(logServiceSpy.info).toHaveBeenCalled();

  const req = httpMock.expectOne(`${service.PAYMENT_URL}`);
  req.error(new ErrorEvent(mockError));

  expect(logServiceSpy.error).toHaveBeenCalled();

});

});
