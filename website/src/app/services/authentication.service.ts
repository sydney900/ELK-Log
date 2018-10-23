import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../common/app-settings';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string;
  private lsKey = 'currentUser';

  constructor(private httpClient: HttpClient, log: LogService) {
    this.url = environment.LOGIN_URL || AppSettings.LOGIN_URL;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.url, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem(this.lsKey, JSON.stringify(user));

            return true;
          }

          return false;
        }));
  }

  logout() {
    localStorage.removeItem(this.lsKey);
  }

  isLoggedIn(): boolean {
    const user = this.currentUser;
    if (user) {
      const expireDate: Date = user.exp;
      return !expireDate || (expireDate && expireDate > new Date());
    }

    return false;
  }

  get currentUser(): any {
    try {
      const item = localStorage.getItem(this.lsKey);
      if (item) {
        const user = JSON.parse(item);
        if (user && user.token) {
          return jwt_decode(user.token);
        }
      }
    } catch (error) {
    }

    return null;

  }
}
