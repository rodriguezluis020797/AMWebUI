import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ProviderDTO } from '../models/UserDTO';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  getUserAsync(): Observable<ProviderDTO> {
    return this.http
      .get<ProviderDTO>('/api/User/GetUser')
      .pipe(
        catchError((error) =>
          this.httpErrorHandler.handleError<ProviderDTO>(error)
        )
      );
  }

  signupAsync(user: ProviderDTO): Observable<ProviderDTO> {
    return this.http.post<ProviderDTO>('/api/User/CreateUser', user).pipe();
  }
}
