import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  fullSystemCheckAsync() {
    return this.http
      .get('/api/SystemStatus/FullSystemCheck')
      .pipe(catchError((error) => this.httpErrorHandler.handleError(error)));
  }
}
