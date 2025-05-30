import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { ClientDTO } from '../models/ClientDTO';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CurrentStateService } from './current-state.service';
import { ClientNoteDTO } from '../models/ClientNoteDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService
  ) { }

  createClientAsync(client: ClientDTO): Observable<ClientDTO | null> {
    return this.http
      .post<ClientDTO>('/api/Client/CreateClient', client, {
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

  getClientsAsync(): Observable<ClientDTO[] | null> {
    return this.http
      .get<ClientDTO[]>('/api/Client/GetClients', {
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

  updateClientAsync(client: ClientDTO): Observable<ClientDTO | null> {
    return this.http
      .post<ClientDTO>('/api/Client/UpdateClient', client, {
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

  deleteClientAsync(client: ClientDTO): Observable<ClientDTO | null> {
    return this.http
      .post<ClientDTO>('/api/Client/DeleteClient', client, {
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

  getClientNotesAsync(dto: ClientDTO): Observable<ClientNoteDTO[] | null> {
    return this.http
      .post<ClientNoteDTO[]>('/api/Client/GetClientNotes', dto, {
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
