import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { catchError, Observable } from 'rxjs';
import { ServiceDTO } from '../models/ServiceDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  createServiceAsync(dto: ServiceDTO): Observable<ServiceDTO> {
    return this.http.post<ServiceDTO>('/api/Service/CreateService', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<ServiceDTO>(error)
      )
    );
  }

  getServicesAsync(): Observable<ServiceDTO[]> {
    return this.http.get<ServiceDTO[]>('/api/Service/GetServices', {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<ServiceDTO[]>(error)
      )
    );
  }

  deleteServiceAsync(dto: ServiceDTO): Observable<ServiceDTO> {
    return this.http.post<ServiceDTO>('/api/Service/DeleteService', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<ServiceDTO>(error)
      )
    );
  }

  updateServiceAsync(dto: ServiceDTO): Observable<ServiceDTO> {
    return this.http.post<ServiceDTO>('/api/Service/UpdateService', dto, {
      withCredentials: true,
    }).pipe(
      catchError((error) =>
        this.httpErrorHandler.handleError<ServiceDTO>(error)
      )
    );
  }

}
