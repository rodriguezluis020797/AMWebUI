import { BaseDTO } from './BaseDTO';

export interface IUserDTO extends BaseDTO {
  userId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  password: string;
  jwtToken: string;
}

export class UserDTO extends BaseDTO implements IUserDTO {
  userId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  password: string;
  jwtToken: string;
  constructor() {
    super();
    this.userId = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.eMail = '';
    this.password = '';
    this.jwtToken = '';
  }
}
