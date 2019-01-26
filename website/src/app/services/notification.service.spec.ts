import { TestBed, inject, ComponentFixture, getTestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MaterialModule } from '../mat.module';
import { MatSnackBar } from '@angular/material';

describe('NotificationService', () => {
  let injector: TestBed;
  let service: NotificationService;
  let snackBarSpy;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('snackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }]
    });

    injector = getTestBed();
    service = injector.get(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have called snackBar open after show erroe', () => {
    service.showError('test');

    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('should have called snackBar open after show success', () => {
    service.showSuccess('test');

    expect(snackBarSpy.open).toHaveBeenCalled();
  });
});
