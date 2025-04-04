import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDTO } from '../../models/UserDTO';
import { catchError, Observable } from 'rxjs';
import { RequestStatusEnum } from '../../models/Enums';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signupAsync(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>('/api/User/CreateUser', user).pipe(
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
