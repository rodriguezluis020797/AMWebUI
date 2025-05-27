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
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private providerService: ProviderService, private toolsService: ToolsService) { }
  dto = new ProviderDTO();
  signUpSuccessful: boolean = false;
  result = new BaseDTO();
  loading: Boolean = true;

  get countryCodeOptions(): { key: CountryCodeEnum; label: string }[] {
    return this.toolsService.getCountryCodes();
  }
  stateOptions: { key: StateCodeEnum; label: string }[] = [];
  timeZoneOptions: { key: TimeZoneCodeEnum; label: string }[] = [];

  ngOnInit() {
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
      payEngineInfoUrl: ''
    };

    this.onCountryChange();

    this.loading = false;
  }

  public getEditLabel(label: string): string {
    if (!label) return '';
    if (label === "Select") {
      return label;
    }
    return label.substring(3).trim();
  }

  onCountryChange() {
    this.stateOptions = this.toolsService.getStateCodes(
      this.dto.countryCode
    );
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(
      this.dto.countryCode
    );
    this.dto.stateCode = StateCodeEnum.Select;
    this.dto.timeZoneCode = TimeZoneCodeEnum.Select;
  }

  submit() {
    this.loading = true;
    this.dto.countryCode = Number(CountryCodeEnum.United_States);
    this.dto.stateCode = Number(StateCodeEnum.US_WA);
    this.dto.timeZoneCode = Number(TimeZoneCodeEnum.Pacific_Standard_Time);
    this.providerService.createProviderAsync(this.dto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }

      this.result = result;
      if (this.result.errorMessage === null) {
        this.signUpSuccessful = true;
      }
      this.loading = false;
    });
  }
}
