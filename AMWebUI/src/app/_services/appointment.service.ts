import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
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

  getAppointmentsAsync(): Observable<AppointmentDTO[]> {
    return this.http.get<AppointmentDTO[]>('/api/Appointment/GetAppointments', {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<AppointmentDTO[]>(error)
      )
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
