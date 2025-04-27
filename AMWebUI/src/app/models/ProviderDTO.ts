import { BaseDTO } from './BaseDTO';
import { CountryCodeEnum, StateCodeEnum, TimeZoneCodeEnum } from './Enums';

export class ProviderDTO extends BaseDTO {
  firstName: string;
  middleName: string | null;
  lastName: string;
  eMail: string;
  countryCode: CountryCodeEnum;
  stateCode: StateCodeEnum;
  timeZoneCode: TimeZoneCodeEnum;
  hasLoggedIn: boolean;
  currentPassword: string;
  newPassword: string;
  isTempPassword: boolean;

  constructor() {
    super();
    this.firstName = '';
    this.middleName = null;
    this.lastName = '';
    this.eMail = '';
    this.countryCode = CountryCodeEnum.Select;
    this.stateCode = StateCodeEnum.Select;
    this.timeZoneCode = TimeZoneCodeEnum.Select;
    this.hasLoggedIn = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.isTempPassword = false;
  }
}
