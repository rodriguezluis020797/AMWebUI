import { BaseDTO } from './BaseDTO';

export class ProviderDTO extends BaseDTO {
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  password: string;
  isTempPassword: boolean;

  constructor() {
    super();
    this.firstName = '';
    this.middleName = null;
    this.lastName = '';
    this.eMail = '';
    this.password = '';
    this.isTempPassword = false;
  }
}
