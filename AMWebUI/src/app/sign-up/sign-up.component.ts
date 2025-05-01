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

@Component({
  standalone: true,
  selector: 'am-sign-up',
  imports: [CommonModule, FormsModule, RouterLink, LoadingScreenComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private providerService: ProviderService) { }
  dto = new ProviderDTO();
  signUpSuccessful: boolean = false;
  result = new BaseDTO();
  loading: Boolean = true;

  ngOnInit() {
    this.dto = {
      hasCompletedSignUp: false,
      countryCode: CountryCodeEnum.United_States,
      stateCode: StateCodeEnum.California,
      timeZoneCode: TimeZoneCodeEnum.Pacific_Standard_Time,
      eMail: 'jdoe@gmail.com',
      errorMessage: '',
      isSpecialCase: false,
      firstName: 'Jon',
      lastName: 'Doe',
      middleName: null,
      currentPassword: '',
      newPassword: '',
      isTempPassword: false,
    };

    this.loading = false;
  }
  submit() {
    this.loading = true;
    this.providerService.createProviderAsync(this.dto).subscribe((result) => {
      this.result = result;
      if (this.result.errorMessage === null) {
        this.signUpSuccessful = true;
      }
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }
}
