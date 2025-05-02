import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { ClientDTO } from '../models/ClientDTO';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  createClientAsync(client: ClientDTO): Observable<ClientDTO> {
    return this.http
      .post<ClientDTO>('/api/Client/GetClient', client, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ClientDTO>(error)
        )
      );
  }

  getClientsAsync(): Observable<ClientDTO[]> {
    return this.http
      .get<ClientDTO[]>('/api/Client/GetClients', {
        withCredentials: true,
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ClientDTO[]>(error)
        )
      );
  }

  updateClientAsync(client: ClientDTO): Observable<ClientDTO> {
    return this.http
      .post<ClientDTO>('/api/Client/UpdateClient', client, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ClientDTO>(error)
        )
      );
  }

  deleteClientAsync(client: ClientDTO): Observable<ClientDTO> {
    return this.http
      .post<ClientDTO>('/api/Client/DeleteClient', client, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ClientDTO>(error)
        )
      );
  }

}
