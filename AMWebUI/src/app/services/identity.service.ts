import { Injectable } from '@angular/core';
import { IUserDTO, UserDTO } from '../../models/UserDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { RequestStatusEnum } from '../../models/Enums';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private authSetvice: AuthserviceService,
    private http: HttpClient,
    private router: Router
  ) {}

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

  refreshTokenAsync(user: IUserDTO): Observable<IUserDTO> {
    if (this.authSetvice.isTokenExpired()) {
      if (this.authSetvice.tokenRefreshAttempt()) {
        return this.refreshTokenAsync(user);
      } else {
        this.router.navigate(['']);
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
      }
    } else {
      return this.http.post<IUserDTO>('/api/Identity/RefreshToken', user).pipe(
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

  resetPasswordAsync(user: IUserDTO): Observable<IUserDTO> {
    if (this.authSetvice.isTokenExpired()) {
      if (this.authSetvice.tokenRefreshAttempt()) {
        return this.refreshTokenAsync(user);
      } else {
        this.router.navigate(['']);
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
      }
    } else {
      return this.http.post<IUserDTO>('/api/Identity/ResetPassword', user).pipe(
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
}
