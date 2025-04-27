import { BaseDTO } from './BaseDTO';
import { TimeZoneEnum } from './Enums';

export class ProviderDTO extends BaseDTO {
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  timeZone: TimeZoneEnum;
  currentPassword: String;
  newPassword: string;
  isTempPassword: boolean;

  constructor() {
    super();
    this.firstName = '';
    this.middleName = null;
    this.lastName = '';
    this.eMail = '';
    this.timeZone = TimeZoneEnum.Uknown;
    this.currentPassword = '';
    this.newPassword = '';
    this.isTempPassword = false;
  }
}
