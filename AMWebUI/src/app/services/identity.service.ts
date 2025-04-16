import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  loginAsync(user: UserDTO): Observable<UserDTO | false> {
    return this.http
      .post<UserDTO>('/api/Identity/Login', user, {
        headers: this.getFingerprintHeaders(),
      })
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<UserDTO>(error))
      );
  }

  logoutAsync(): Observable<boolean> {
    return this.http
      .get<boolean>('/api/Identity/LogOut')
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<boolean>(error))
      );
  }

  resetPasswordAsync(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>('/api/Identity/ResetPassword', user, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<UserDTO>(error))
      );
  }

  pingAsync(): Observable<any> {
    return this.http
      .get('/api/Identity/Ping', { headers: this.getFingerprintHeaders() })
      .pipe(catchError((error) => this.httpErrorHandler.handleError(error)));
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
