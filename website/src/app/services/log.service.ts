import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILog } from '../models/ilog';
import { ILogItem } from '../models/logitem';
import { environment } from '../../environments/environment';
import { LocalLogService } from './local-log.service';

@Injectable({
  providedIn: 'root'
})
export class LogService implements ILog<Observable<any>> {
  readonly LOG_URL = environment.LOGURL;

  constructor(private http: HttpClient, private localLog: LocalLogService) {
    if (!this.LOG_URL) {
      throw new Error('The envirement varibale LOG_URL should be provided');
    }
  }

  log(message: string): Observable<any> {
    if (this.localLog) {
      this.localLog.log(message);
    }

    if (this.LOG_URL) {
      return this.saveLogToServer(this.createLogItem(message, 'log'));
    }

    return of(null);
  }

  info(message: string): Observable<any> {
    if (this.localLog) {
      this.localLog.info(message);
    }

    if (this.LOG_URL) {
      return this.saveLogToServer(this.createLogItem(message, 'info'));
    }

    return of(null);
  }

  warn(message: string): Observable<any> {
    if (this.localLog) {
      this.localLog.warn(message);
    }

    if (this.LOG_URL) {
      return this.saveLogToServer(this.createLogItem(message, 'warn'));
    }

    return of(null);
  }

  error(message: string): Observable<any> {
    if (this.localLog) {
      this.localLog.error(message);
    }

    if (this.LOG_URL) {
      return this.saveLogToServer(this.createLogItem(message, 'error'));
    }

    return of(null);
  }

  debug(message: string): Observable<any> {
    if (this.localLog) {
      this.localLog.debug(message);
    }

    if (this.LOG_URL) {
      return this.saveLogToServer(this.createLogItem(message, 'debug'));
    }

    return of(null);
  }

  private createLogItem(message: string, type: string): ILogItem {
    return {
      url: window.location.href,
      content: message,
      type: type,
      userAgent: window.navigator.userAgent,
      userLang: window.navigator.language
    };
  }

  private saveLogToServer(logItem: ILogItem): Observable<any> {
    return this.http.post<any>(this.LOG_URL, logItem);
  }
}
