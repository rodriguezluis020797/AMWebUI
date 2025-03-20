import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemStatusDTO } from '../../models/SystemCheckDTO';

@Injectable({
  providedIn: 'root',
})
export class SystemstatusService {
  constructor(private http: HttpClient) {}

  fullSystemCheckAsyinc(): Observable<ISystemStatusDTO> {
    return this.http.get<ISystemStatusDTO>('/api/SystemStatus/FullSystemCheck');
  }
}
