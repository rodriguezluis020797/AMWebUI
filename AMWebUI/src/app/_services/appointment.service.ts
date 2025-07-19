import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CurrentStateService } from './current-state.service';
import { AppointmentRequestDTO } from '../models/AppointmentRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  appointmentRequestAsync(dto: AppointmentRequestDTO): Observable<AppointmentRequestDTO | null> {
    return this.http.post<AppointmentRequestDTO>('/api/Appointment/AppointmentRequest', dto)
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

  createAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO | null> {
    return this.http.post<AppointmentDTO>('/api/Appointment/CreateAppointment', dto, {
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

  getAllAppointmentsAsync(): Observable<AppointmentDTO[] | null> {
    return this.http.get<AppointmentDTO[]>('/api/Appointment/GetAllAppointments', {
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

  getUpcomingAppointmentsAsync(): Observable<AppointmentDTO[] | null> {
    return this.http.get<AppointmentDTO[]>('/api/Appointment/GetUpcomingAppointments', {
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

  deleteAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO | null> {
    return this.http.post<AppointmentDTO>('/api/Appointment/DeleteAppointment', dto, {
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

  updateAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO | null> {
    return this.http.post<AppointmentDTO>('/api/Appointment/UpdateAppointment', dto, {
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
