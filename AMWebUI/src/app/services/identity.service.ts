import { Injectable } from '@angular/core';
import { UserDTO } from '../../models/UserDTO';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {}

  loginAsync(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>('/api/Identity/LogIn', user).pipe(
      catchError((error) => {
        this.httpErrorHandler.handleError(error);
        user.password = '';
        return of(user);
      })
    );
  }

  pingAsync() {
    return this.http
      .get('/api/Identity/Ping')
      .pipe(catchError((error) => this.httpErrorHandler.handleError(error)));
  }
}
