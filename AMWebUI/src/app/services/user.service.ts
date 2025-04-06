import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UserDTO } from '../models/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signupAsync(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>('/api/User/CreateUser', user)
      .pipe
      //add new logic
      ();
  }
}
