import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpStatusCodeEnum } from '../../models/Enums';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private router: Router) {}

  handleError<T>(error: HttpErrorResponse): Observable<T> {
    switch (error.status) {
      case HttpStatusCodeEnum.ServerError:
        this.router.navigate(['/error']);
        break;
      case HttpStatusCodeEnum.BadCredentials:
        break;
    }
    return of(null as unknown as T);
  }
}
