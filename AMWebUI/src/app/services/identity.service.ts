import { Injectable } from '@angular/core';
import { IUserDTO } from '../../models/UserDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient) {}

  loginAsync(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>('/api/Identity/LogIn', user);
  }
}
