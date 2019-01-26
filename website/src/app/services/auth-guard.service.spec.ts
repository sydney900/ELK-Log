import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from './authentication.service';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthGuardService', () => {
  let injector: TestBed;
  let service: AuthGuard;

  let authServiceSpy: AuthenticationService;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: AuthenticationService, useValue: authServiceSpy}
      ]
    });

    injector = getTestBed();
    service = injector.get(AuthGuard);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('AuthenticationService should have called when canActivate', () => {
    const mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    service.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
  });

});
