import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { ProviderDTO } from '../models/ProviderDTO';
import { BaseDTO } from '../models/BaseDTO';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  isLoggedInAsync(): Observable<HttpResponse<any>> {
    return this.http
      .get<HttpResponse<any>>('/api/Identity/IsLoggedIn', {
        observe: 'response',
        headers: this.getFingerprintHeaders(),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.httpErrorHandler.handleError<HttpResponse<any>>(error);
        })
      );
  }
  loginAsync(provider: ProviderDTO): Observable<BaseDTO> {
    return this.http
      .post<BaseDTO>('/api/Identity/Login', provider, {
        headers: this.getFingerprintHeaders(),
      })
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<BaseDTO>(error))
      );
  }

  logoutAsync(): Observable<boolean> {
    return this.http
      .get<boolean>('/api/Identity/LogOut')
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<boolean>(error))
      );
  }

  updatePasswordAsync(provider: ProviderDTO): Observable<BaseDTO> {
    return this.http
      .post<BaseDTO>('/api/Identity/UpdatePassword', provider, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<BaseDTO>(error))
      );
  }

  pingAsync(): Observable<HttpResponse<any>> {
    return this.http
      .get('/api/Identity/Ping', {
        withCredentials: true,
        headers: this.getFingerprintHeaders(),
        observe: 'response',
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<HttpResponse<any>>(error)
        )
      );
  }

  resetPasswordAsync(dto: ProviderDTO): Observable<HttpResponse<any>> {
    return this.http
      .post('/api/Identity/ResetPassword', dto, {
        withCredentials: true,
        headers: this.getFingerprintHeaders(),
        observe: 'response',
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<HttpResponse<any>>(error)
        )
      );
  }

  private getFingerprintHeaders(): HttpHeaders {
    const nav = navigator as any;

    const fingerprint = {
      userAgent: navigator.userAgent,
      platform: nav.userAgentData?.platform || navigator.platform || '',
      language: navigator.language,
    };

    return new HttpHeaders({
      'X-Fingerprint-UA': fingerprint.userAgent,
      'X-Fingerprint-Platform': fingerprint.platform,
      'X-Fingerprint-Language': fingerprint.language,
    });
  }
}
