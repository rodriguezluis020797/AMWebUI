import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpStatusCodeEnum } from '../models/Enums';
import { CurrentStateService } from './current-state.service';
import { ProviderDTO } from '../models/ProviderDTO';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(
    private router: Router,
    private currentStateService: CurrentStateService
  ) {}

  handleError<T>(error: HttpErrorResponse): Observable<T> {
    let dto = new ProviderDTO();
    if (error.status === 0) {
      // Network error or server unreachable
      return of(false as unknown as T);
    }

    switch (error.status) {
      case HttpStatusCodeEnum.ServerError:
      case HttpStatusCodeEnum.SystemUnavailable:
        this.router.navigate(['/error']);
        return of(HttpStatusCodeEnum.ServerError as unknown as T);

      case HttpStatusCodeEnum.BadCredentials:
        return of(dto as unknown as T);

      case HttpStatusCodeEnum.BadPassword:
        dto.errorMessage = 'error';
        return of(dto as unknown as T);

      case HttpStatusCodeEnum.Unauthorized:
        this.currentStateService.loggedInSubject.next(false);
        this.router.navigate(['/unauthorized']);
        return of(null as unknown as T);

      default:
        return of(null as unknown as T);
    }
  }
}
