import { BaseDTO } from './BaseDTO';
import { AccountStatusEnum, CountryCodeEnum, StateCodeEnum, TimeZoneCodeEnum } from './Enums';

export class ProviderDTO extends BaseDTO {
  firstName: string;
  middleName: string | null;
  lastName: string;
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  eMail: string;
  countryCode: CountryCodeEnum;
  stateCode: StateCodeEnum;
  timeZoneCode: TimeZoneCodeEnum;
  hasLoggedIn: boolean;
  currentPassword: string;
  newPassword: string;
  isTempPassword: boolean;
  payEngineInfoUrl: string;
  nextBillingDate: Date | null;
  accountStatus: AccountStatusEnum;
  description: string;

  constructor() {
    super();
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.businessName = '';
    this.addressLine1 = '';
    this.addressLine2 = '';
    this.city = '';
    this.zipCode = '';
    this.eMail = '';
    this.countryCode = CountryCodeEnum.Select;
    this.stateCode = StateCodeEnum.Select;
    this.timeZoneCode = TimeZoneCodeEnum.Select;
    this.hasLoggedIn = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.isTempPassword = false;
    this.payEngineInfoUrl = '';
    this.nextBillingDate = null;
    this.accountStatus = AccountStatusEnum.Unknown;
    this.description = '';
  }
}