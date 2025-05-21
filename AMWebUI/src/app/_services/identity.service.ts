import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ProviderDTO } from '../models/ProviderDTO';
import { BaseDTO } from '../models/BaseDTO';
import { Router } from '@angular/router';
import { CurrentStateService } from './current-state.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  isLoggedInAsync(): Observable<HttpResponse<any> | null> {
    return this.http
      .get<HttpResponse<any>>('/api/Identity/IsLoggedIn', {
        observe: 'response',
        headers: this.getFingerprintHeaders(),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['/error']);
          return of(null);
        })
      );
  }

  loginAsync(provider: ProviderDTO): Observable<ProviderDTO | null> {
    return this.http
      .post<ProviderDTO>('/api/Identity/Login', provider, {
        headers: this.getFingerprintHeaders(),
      })
      .pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        }
        )
      );
  }

  logoutAsync(): Observable<boolean | null> {
    return this.http
      .get<boolean>('/api/Identity/LogOut')
      .pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        })
      );
  }

  updatePasswordAsync(provider: ProviderDTO): Observable<BaseDTO | null> {
    return this.http
      .post<BaseDTO>('/api/Identity/UpdatePassword', provider, {
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.currentStateService.loggedInSubject.next(false);
            this.router.navigate(['/unauthorized']);
          } else {
            this.router.navigate(['/error']);
          }
          return of(null);
        })
      );
  }

  pingAsync(): Observable<HttpResponse<any> | null> {
    return this.http
      .get('/api/Identity/Ping', {
        withCredentials: true,
        headers: this.getFingerprintHeaders(),
        observe: 'response',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.currentStateService.loggedInSubject.next(false);
            this.router.navigate(['/unauthorized']);
          } else {
            this.router.navigate(['/error']);
          }
          return of(null);
        })
      );
  }

  resetPasswordAsync(dto: ProviderDTO): Observable<HttpResponse<any> | null> {
    return this.http
      .post('/api/Identity/ResetPassword', dto, {
        withCredentials: true,
        headers: this.getFingerprintHeaders(),
        observe: 'response',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.currentStateService.loggedInSubject.next(false);
            this.router.navigate(['/unauthorized']);
          } else {
            this.router.navigate(['/error']);
          }
          return of(null);
        })
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
