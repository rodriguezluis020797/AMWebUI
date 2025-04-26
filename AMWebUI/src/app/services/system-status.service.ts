import { HttpClient, HttpResponse } from '@angular/common/http';
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

  fullSystemCheckAsync(): Observable<HttpResponse<any>> {
    return this.http
      .get<boolean>('/api/SystemStatus/FullSystemCheck', {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return this.httpErrorHandler.handleError<HttpResponse<any>>(error);
        })
      );
  }
}
