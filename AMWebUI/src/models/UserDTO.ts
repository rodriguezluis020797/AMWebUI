import { BaseDTO } from './BaseDTO';

export interface IUserDTO {
  userId: string;
  firtName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  password: string;
}

export class UserDTO extends BaseDTO implements IUserDTO {
  userId: string;
  firtName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  password: string;
  constructor() {
    super();
    this.userId = '';
    this.firtName = '';
    this.middleName = '';
    this.lastName = '';
    this.eMail = '';
    this.password = '';
  }
}
