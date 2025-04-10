import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpStatusCodeEnum } from '../models/Enums';
import { UserDTO } from '../models/UserDTO';
import { CurrentStateService } from './current-state.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  handleError<T>(error: HttpErrorResponse): Observable<T> {
    let dto = new UserDTO();
    switch (error.status) {
      case HttpStatusCodeEnum.ServerError:
      case HttpStatusCodeEnum.SystemUnavailable:
        this.router.navigate(['/error']);
        return of(null as unknown as T);

      case HttpStatusCodeEnum.BadCredentials:
        return of(dto as unknown as T);

      case HttpStatusCodeEnum.BadPassword:
        dto.errorMessage =
          'Password does not meet requirements or has been used recently.';
        return of(dto as unknown as T);

      case HttpStatusCodeEnum.Unauthorized:
        this.currentStateService.setLoggedIn(false);
        this.router.navigate(['unauthorized']);
        return of(null as unknown as T);

      default:
        return of(null as unknown as T);
    }
  }
}
