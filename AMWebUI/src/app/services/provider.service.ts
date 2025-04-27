import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { ProviderDTO } from '../models/ProviderDTO';
import { BaseDTO } from '../models/BaseDTO';
import { CountryCodeEnum } from '../models/Enums';

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

  updateEMailAsync(provider: ProviderDTO): Observable<ProviderDTO> {
    return this.http
      .post<ProviderDTO>('/api/Provider/UpdateEMail', provider)
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }

  verifyUpdateEMailAsync(guid: string): Observable<BaseDTO> {
    return this.http
      .get<BaseDTO>('/api/Provider/VerifyUpdateEMail', {
        params: {
          guid: guid,
        },
      })
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<BaseDTO>(error))
      );
  }

  createProviderAsync(provider: ProviderDTO): Observable<ProviderDTO> {
    return this.http
      .post<ProviderDTO>('/api/Provider/CreateProvider', provider)
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }

  getCountryCodes(): CountryCodeEnum[] {
    return [
      CountryCodeEnum.Select,
      CountryCodeEnum.UnitedStates,
      CountryCodeEnum.Mexico,
    ];
  }
}
