import { BaseDTO } from './BaseDTO';

export class ProviderDTO extends BaseDTO {
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  currentPassword: String;
  newPassword: string;
  isTempPassword: boolean;

  constructor() {
    super();
    this.firstName = '';
    this.middleName = null;
    this.lastName = '';
    this.eMail = '';
    this.currentPassword = '';
    this.newPassword = '';
    this.isTempPassword = false;
  }
}
