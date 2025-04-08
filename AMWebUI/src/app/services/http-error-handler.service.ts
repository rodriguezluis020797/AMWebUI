import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpStatusCodeEnum } from '../models/Enums';
import { UserDTO } from '../models/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private router: Router) {}

  handleError<T>(error: HttpErrorResponse): Observable<T> {
    switch (error.status) {
      case HttpStatusCodeEnum.ServerError:
      case HttpStatusCodeEnum.SystemUnavailable:
        this.router.navigate(['/error']);
        return of(null as unknown as T);

      case HttpStatusCodeEnum.BadCredentials:
        return of(new UserDTO() as unknown as T);

      default:
        return of(null as unknown as T);
    }
  }
}
