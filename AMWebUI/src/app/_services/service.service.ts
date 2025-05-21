import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { catchError, Observable, of } from 'rxjs';
import { ServiceDTO } from '../models/ServiceDTO';
import { CurrentStateService } from './current-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  createServiceAsync(dto: ServiceDTO): Observable<ServiceDTO | null> {
    return this.http.post<ServiceDTO>('/api/Service/CreateService', dto, {
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

  getServicesAsync(): Observable<ServiceDTO[] | null> {
    return this.http.get<ServiceDTO[]>('/api/Service/GetServices', {
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

  deleteServiceAsync(dto: ServiceDTO): Observable<ServiceDTO | null> {
    return this.http.post<ServiceDTO>('/api/Service/DeleteService', dto, {
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

  updateServiceAsync(dto: ServiceDTO): Observable<ServiceDTO | null> {
    return this.http.post<ServiceDTO>('/api/Service/UpdateService', dto, {
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

}
