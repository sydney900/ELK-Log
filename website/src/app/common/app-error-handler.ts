import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';

@Injectable({
    providedIn: 'root'
  })
export class AppErrorHandler implements ErrorHandler {
    constructor(private log: LogService) {
    }

    handleError(error: any): void {
        this.log.error(error);
    }
}
