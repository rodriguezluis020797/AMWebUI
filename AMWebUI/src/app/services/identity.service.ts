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

  loginAsync(user: UserDTO): Observable<UserDTO> {
    // Make the POST request with headers
    return this.http
      .post<UserDTO>('/api/Identity/Login', user, {
        headers: this.getFingerprintHeaders(),
      }) // POST request with fingerprint headers
      .pipe(
        catchError((error) => {
          // Handle the error properly and return an observable of UserDTO
          const userDTO = new UserDTO(); // Return an empty UserDTO on error
          return of(userDTO); // Ensure the returned type is Observable<UserDTO>
        })
      );
  }

  pingAsync(): Observable<any> {
    return this.http
      .get('/api/Identity/Ping', { headers: this.getFingerprintHeaders() }) // Pass headers directly
      .pipe(catchError((error) => this.httpErrorHandler.handleError(error)));
  }

  private getFingerprintHeaders(): HttpHeaders {
    const nav = navigator as any; // Temporary cast to bypass TS check

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
