import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderService } from '../_services/provider.service';
import { RouterLink } from '@angular/router';
import { ProviderDTO } from '../models/ProviderDTO';
import { BaseDTO } from '../models/BaseDTO';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import {
  CountryCodeEnum,
  StateCodeEnum,
  TimeZoneCodeEnum,
} from '../models/Enums';
import { ToolsService } from '../_services/tools.service';

@Component({
  standalone: true,
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule, RouterLink, LoadingScreenComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  dto = new ProviderDTO();
  signUpSuccessful = false;
  result = new BaseDTO();
  loading = true;

  // Cache country codes once since it doesn't change dynamically here
  countryCodeOptions: { key: CountryCodeEnum; label: string }[] = [];
  stateOptions: { key: StateCodeEnum; label: string }[] = [];
  timeZoneOptions: { key: TimeZoneCodeEnum; label: string }[] = [];


  constructor(
    private providerService: ProviderService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.countryCodeOptions = this.toolsService.getCountryCodes();
    this.dto = {
      firstName: 'Luis',
      middleName: null,
      lastName: 'Rodriguez',
      businessName: 'AM Tech',
      addressLine1: '6619 Gehrig Dr.',
      addressLine2: '',
      city: 'Pasco',
      zipCode: '99301',
      eMail: 'rodriguez.luis020797@gmail.com',
      countryCode: CountryCodeEnum.United_States,
      stateCode: StateCodeEnum.Select,
      timeZoneCode: TimeZoneCodeEnum.Select,
      hasLoggedIn: false,
      currentPassword: '',
      newPassword: '',
      isTempPassword: false,
      errorMessage: '',
      isSpecialCase: false,
      payEngineInfoUrl: '',
      nextBillingDate: null,
      subscriptionToBeCancelled: false,
    };

    this.updateStateAndTimeZoneOptions(this.dto.countryCode);

    this.loading = false;
  }

  getEditLabel(label: string): string {
    if (!label) return '';
    return label === 'Select' ? label : label.substring(3).trim();
  }

  updateStateAndTimeZoneOptions(countryCode: CountryCodeEnum): void {
    this.stateOptions = this.toolsService.getStateCodes(countryCode);
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(countryCode);
    this.dto.stateCode = StateCodeEnum.Select;
    this.dto.timeZoneCode = TimeZoneCodeEnum.Select;
  }

  onCountryChange(): void {
    // Although country select is disabled, keep this method for future flexibility
    this.updateStateAndTimeZoneOptions(this.dto.countryCode);
  }

  submit(): void {
    this.loading = true;

    // Hardcoding US codes as per your logic
    this.dto.countryCode = CountryCodeEnum.United_States;
    this.dto.stateCode = StateCodeEnum.US_WA;
    this.dto.timeZoneCode = TimeZoneCodeEnum.Pacific_Standard_Time;

    this.providerService.createProviderAsync(this.dto).subscribe((res) => {
      this.loading = false;
      if (!res) return;
      this.result = res;
      this.signUpSuccessful = !this.result.errorMessage;
    });
  }
}