import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ISystemStatusDTO } from '../../models/SystemCheckDTO';
import { RequestStatusEnum } from '../../models/Enums';

@Injectable({
  providedIn: 'root',
})
export class SystemstatusService {
  constructor(private http: HttpClient) {}

  fullSystemCheckAsync(): Observable<ISystemStatusDTO> {
    return this.http
      .get<ISystemStatusDTO>('/api/SystemStatus/FullSystemCheck')
      .pipe(
        catchError((error) => {
          const fallbackResponse: ISystemStatusDTO = {
            requestStatus: RequestStatusEnum.Error,
          };
          return of(fallbackResponse);
        })
      );
  }
}
