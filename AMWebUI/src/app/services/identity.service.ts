import { Injectable } from '@angular/core';
import { IUserDTO, UserDTO } from '../../models/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor() {}

  loginAsync(user: IUserDTO): IUserDTO {
    if (!user.userId?.trim()) {
      console.log('login unsuccessful');
    } else {
      console.log('login successful');
    }
    return user;
  }
}
