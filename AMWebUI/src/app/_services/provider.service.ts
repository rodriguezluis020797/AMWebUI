import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProviderDTO } from '../models/ProviderDTO';
import { BaseDTO } from '../models/BaseDTO';
import { Router } from '@angular/router';
import { CurrentStateService } from './current-state.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  getProviderAsync(generateUrl: boolean): Observable<ProviderDTO | null> {
    return this.http
      .get<ProviderDTO>('/api/Provider/GetProvider', {
        withCredentials: true,
        params: {
          generateUrl: generateUrl
        }
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

  updateProviderAsync(provider: ProviderDTO): Observable<BaseDTO | null> {
    return this.http
      .post<BaseDTO>('/api/Provider/UpdateProvider', provider, {
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

  requestUpdateEMailAsync(provider: ProviderDTO): Observable<ProviderDTO | null> {
    return this.http
      .post<ProviderDTO>('/api/Provider/UpdateEMail', provider, {
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

  updateEMailAsync(guid: string): Observable<BaseDTO | null> {
    return this.http
      .get<BaseDTO>('/api/Provider/updateEMail', {
        params: {
          guid: guid,
        },
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

  verifyEMailAsync(guid: string, verifying: boolean): Observable<BaseDTO | null> {
    return this.http
      .get<BaseDTO>('/api/Provider/VerifyEMail', {
        params: {
          guid: guid,
          verifying: verifying
        },
      })
      .pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        })
      );
  }

  createProviderAsync(provider: ProviderDTO): Observable<ProviderDTO | null> {
    return this.http
      .post<ProviderDTO>('/api/Provider/CreateProvider', provider)
      .pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        }
        )
      );
  }

  cancelSubscriptionAsync(): Observable<BaseDTO | null> {
    return this.http
      .get<ProviderDTO>('/api/Provider/CancelSubscription', {
        withCredentials: true
      })
      .pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        }
        )
      );
  }
}
