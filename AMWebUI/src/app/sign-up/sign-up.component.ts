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
import { ProviderAvailabilityDTO } from '../models/ProviderAvailabilityDTO';

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

  countryCodeOptions: { key: CountryCodeEnum; label: string }[] = [];
  stateOptions: { key: StateCodeEnum; label: string }[] = [];
  timeZoneOptions: { key: TimeZoneCodeEnum; label: string }[] = [];
  daysOfWeek = [0, 1, 2, 3, 4, 5, 6]; // Sunday to Saturday
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  constructor(
    private providerService: ProviderService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    // Set default country code to ensure dropdowns are populated
    this.dto.countryCode = CountryCodeEnum.United_States;

    this.countryCodeOptions = this.toolsService.getCountryCodes();
    this.updateStateAndTimeZoneOptions(this.dto.countryCode);

    // Initialize default availability if not already done
    if (this.dto.availabilities.length === 0) {
      this.dto.availabilities = this.daysOfWeek.map(day => {
        const availability = new ProviderAvailabilityDTO();
        availability.dayOfWeek = day;
        availability.available = true;
        availability.startTime = '09:00'; // default
        availability.endTime = '17:00';   // default
        return availability;
      });
    }

    this.loading = false;
  }

  getEditLabel(label: string): string {
    if (!label) return '';
    return label === 'Select' ? label : label.substring(3).trim();
  }

  updateStateAndTimeZoneOptions(countryCode: CountryCodeEnum): void {
    if (!countryCode) return;

    this.stateOptions = this.toolsService.getStateCodes(countryCode);
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(countryCode);
    this.dto.stateCode = StateCodeEnum.Select;
    this.dto.timeZoneCode = TimeZoneCodeEnum.Select;
  }

  onCountryChange(): void {
    this.updateStateAndTimeZoneOptions(this.dto.countryCode);
  }

  submit(): void {
    this.loading = true;

    // Hardcoding US codes as per current business logic
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