import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UserDTO } from '../models/UserDTO';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  getUserAsync(): Observable<UserDTO> {
    return this.http
      .get<UserDTO>('/api/User/GetUser')
      .pipe(
        catchError((error) => this.httpErrorHandler.handleError<UserDTO>(error))
      );
  }

  signupAsync(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>('/api/User/CreateUser', user).pipe();
  }
}
