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
    // Temporary cast to bypass TypeScript checks (needed due to newer User-Agent API)
    const nav = navigator as any;

    // Define the fingerprint object with necessary information
    const fingerprint = {
      userAgent: navigator.userAgent,
      platform: nav.userAgentData?.platform || navigator.platform || '',
      language: navigator.language,
      languages: navigator.languages.join(','),
    };

    // Set the headers with the fingerprint data
    const headers = new HttpHeaders({
      'X-Fingerprint-UA': fingerprint.userAgent,
      'X-Fingerprint-Platform': fingerprint.platform,
      'X-Fingerprint-Language': fingerprint.language,
    });

    // Make the POST request with headers
    return this.http
      .post<UserDTO>('/api/Identity/Login', user, { headers }) // POST request with fingerprint headers
      .pipe(
        catchError((error) => {
          // Handle the error properly and return an observable of UserDTO
          const userDTO = new UserDTO(); // Return an empty UserDTO on error
          return of(userDTO); // Ensure the returned type is Observable<UserDTO>
        })
      );
  }

  pingAsync() {
    const nav = navigator as any; // Temporary cast to bypass TS check

    const fingerprint = {
      userAgent: navigator.userAgent,
      platform: nav.userAgentData?.platform || navigator.platform || '',
      language: navigator.language,
      languages: navigator.languages.join(','),
    };

    const headers = new HttpHeaders({
      'X-Fingerprint-UA': fingerprint.userAgent,
      'X-Fingerprint-Platform': fingerprint.platform,
      'X-Fingerprint-Language': fingerprint.language,
      'X-Fingerprint-Languages': fingerprint.languages,
    });

    return this.http
      .get('/api/Identity/Ping', { headers })
      .pipe(catchError((error) => this.httpErrorHandler.handleError(error)));
  }
}
