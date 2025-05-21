import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpStatusCodeEnum } from '../models/Enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  fullSystemCheckAsync(): Observable<HttpResponse<any> | null> {
    return this.http
      .get<any>('/api/SystemStatus/FullSystemCheck', {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}
