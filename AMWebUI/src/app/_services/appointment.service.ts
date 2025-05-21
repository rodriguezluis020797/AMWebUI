import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService,
    private router: Router
  ) { }

  createAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>('/api/Appointment/CreateAppointment', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<AppointmentDTO>(error)
      )
    );
  }

  getAllAppointmentsAsync(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>('/api/Appointment/GetAllAppointments', {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<AppointmentDTO[]>(error)
      )
    );
  }

  getUpcomingAppointmentsAsync(): Observable<AppointmentDTO[] | null> {
    return this.http.get<AppointmentDTO[]>('/api/Appointment/GetUpcomingAppointments', {
      withCredentials: true,
    }).pipe(
      catchError((error) => {
        this.router.navigate(['/error'])
        return of(null);
      })
    );
  }

  deleteAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>('/api/Appointment/DeleteAppointment', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<AppointmentDTO>(error)
      )
    );
  }

  updateAppointmentAsync(dto: AppointmentDTO): Observable<AppointmentDTO> {
    return this.http.post<AppointmentDTO>('/api/Appointment/UpdateAppointment', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<AppointmentDTO>(error)
      )
    );
  }
}
