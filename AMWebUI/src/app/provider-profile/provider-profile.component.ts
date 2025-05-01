import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import {
  CountryCodeEnum,
  StateCodeEnum,
  TimeZoneCodeEnum,
} from '../models/Enums';
import { ToolsService } from '../services/tools.service';
import { CurrentStateService } from '../services/current-state.service';

@Component({
  selector: 'am-provider-profile',
  imports: [CommonModule, RouterLink, FormsModule, LoadingScreenComponent],
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css',
})
export class ProviderProfileComponent implements OnInit {
  dto: ProviderDTO = new ProviderDTO();
  editDTO: ProviderDTO = new ProviderDTO();
  editProvider: boolean = false;
  loading: boolean = true;
  disableCancel: boolean = false;
  CountryCodeEnum = CountryCodeEnum;
  StateCodeEnum = StateCodeEnum;
  TimeZoneCodeEnum = TimeZoneCodeEnum;
  get countryCodeOptions(): { key: CountryCodeEnum; label: string }[] {
    return this.toolsService.getCountryCodes();
  }
  stateOptions: { key: StateCodeEnum; label: string }[] = [];
  timeZoneOptions: { key: TimeZoneCodeEnum; label: string }[] = [];

  constructor(
    private providerService: ProviderService,
    private toolsService: ToolsService,
    private currentStateService: CurrentStateService
  ) { }
  ngOnInit(): void {
    this.getProvider();
  }

  getProvider() {
    this.loading = true;
    this.providerService.getProviderAsync().subscribe((result) => {
      this.dto = result;
      this.currentStateService.hasCompletedProfile.next(
        this.dto.hasCompletedSignUp
      );
      if (!this.currentStateService.hasCompletedProfile.value) {
        this.disableCancel = true;
        this.edit();
      } else {
        this.disableCancel = false;
      }
      this.setTimeout();
    });
  }

  getEnumLabel(enumObj: any, enumValue: any): string {
    return enumObj[enumValue]?.replaceAll('_', ' ') || '';
  }

  edit() {
    this.editDTO = JSON.parse(JSON.stringify(this.dto));
    this.editProvider = true;
    this.stateOptions = this.toolsService.getStateCodes(
      this.editDTO.countryCode
    );
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(
      this.editDTO.countryCode
    );
  }

  onCountryChange() {
    this.stateOptions = this.toolsService.getStateCodes(
      this.editDTO.countryCode
    );
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(
      this.editDTO.countryCode
    );
    this.editDTO.stateCode = StateCodeEnum.Select;
    this.editDTO.timeZoneCode = TimeZoneCodeEnum.Select;
  }

  editSave() {
    this.loading = true;
    this.editDTO.countryCode = Number(this.editDTO.countryCode);
    this.editDTO.stateCode = Number(this.editDTO.stateCode);
    this.editDTO.timeZoneCode = Number(this.editDTO.timeZoneCode);
    this.providerService
      .updateProviderAsync(this.editDTO)
      .subscribe((result) => {
        if (!result.errorMessage || result.errorMessage.trim() === '') {
          this.dto = JSON.parse(JSON.stringify(this.editDTO));
          this.cancelEdit();
          this.currentStateService.hasCompletedProfile.next(true);
        } else {
          this.editDTO.errorMessage = result.errorMessage;
        }
        this.setTimeout();
      });
  }

  cancelEdit() {
    this.editDTO = new ProviderDTO();
    this.editProvider = false;
  }
  setTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
