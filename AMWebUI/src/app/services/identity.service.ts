import { Injectable } from '@angular/core';
import { IUserDTO } from '../../models/UserDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { RequestStatusEnum } from '../../models/Enums';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient) {}

  loginAsync(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>('/api/Identity/LogIn', user).pipe(
      catchError((error: HttpErrorResponse) => {
        const defaultUser: IUserDTO = {
          userId: '',
          firstName: '',
          middleName: null,
          lastName: '',
          eMail: '',
          password: '',
          jwtToken: '',
          requestStatus: RequestStatusEnum.Error,
          errorMessage: '',
          isTempPassword: false,
        };
        return of(defaultUser);
      })
    );
  }
}
