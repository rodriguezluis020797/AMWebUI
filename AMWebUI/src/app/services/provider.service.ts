import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { ProviderDTO } from '../models/ProviderDTO';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  getProviderAsync(): Observable<ProviderDTO> {
    return this.http
      .get<ProviderDTO>('/api/Provider/GetProvider')
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }

  updateProviderAsync(provider: ProviderDTO): Observable<ProviderDTO> {
    return this.http
      .post<ProviderDTO>('/api/Provider/UpdateProvider', provider)
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }

  signupAsync(provider: ProviderDTO): Observable<ProviderDTO> {
    return this.http
      .post<ProviderDTO>('/api/Provider/CreateProvider', provider)
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }
}
