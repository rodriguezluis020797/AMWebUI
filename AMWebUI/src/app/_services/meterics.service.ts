import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsDTO } from '../models/MetricsDTO';
import { CurrentStateService } from './current-state.service';
import { Observable, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MetericsService {

  constructor(private http: HttpClient,
    private router: Router,
    private currentStateService: CurrentStateService) { }

  getMetricsByRangeAsync(dto: MetricsDTO): Observable<MetricsDTO | null> {
    return this.http
      .post<MetricsDTO>('/api/Metrics/GetMetricsByRange', dto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.currentStateService.loggedInSubject.next(false);
            this.router.navigate(['/unauthorized']);
          } else {
            this.router.navigate(['/error']);
          }
          return of(null);
        })
      );
  }
}