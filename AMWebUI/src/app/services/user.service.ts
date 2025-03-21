import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserDTO } from '../../models/UserDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginAsync(user: IUserDTO): Observable<IUserDTO> {
    return this.http.post<IUserDTO>('/api/User/CreateUser', user);
  }
}
