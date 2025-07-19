import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../_services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import {
  CountryCodeEnum,
  StateCodeEnum,
  TimeZoneCodeEnum,
  AccountStatusEnum
} from '../models/Enums';
import { ToolsService } from '../_services/tools.service';
import { CurrentStateService } from '../_services/current-state.service';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { DayOfTheWeekPipe } from '../pipes/day-of-the-week.pipe';

@Component({
  selector: 'am-provider-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LoadingScreenComponent,
    DeleteEntityComponent,
    DayOfTheWeekPipe
  ],
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css',
})
export class ProviderProfileComponent implements OnInit {
  dto = new ProviderDTO();
  editDTO = new ProviderDTO();
  editProvider = false;
  loading = true;
  disableCancel = false;
  showDeleteModal = false;
  showReSubscribeModal = false;

  CountryCodeEnum = CountryCodeEnum;
  StateCodeEnum = StateCodeEnum;
  TimeZoneCodeEnum = TimeZoneCodeEnum;
  AccountStatusEnum = AccountStatusEnum;

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

  get countryCodeOptions(): { key: CountryCodeEnum; label: string }[] {
    return this.toolsService.getCountryCodes();
  }

  getProvider(): void {
    this.loading = true;
    this.providerService.getProviderAsync(true).subscribe(result => {
      this.loading = false;
      if (!result) return;
      this.dto = result;
      this.currentStateService.accountStatusSubject.next(this.dto.accountStatus);
      this.disableCancel = false;
    });
  }

  getEnumLabel(enumObj: any, value: any): string {
    return enumObj[value]?.replaceAll('_', ' ').replaceAll('US ', '') || '';
  }

  getEditLabel(label: string): string {
    return label && label !== 'Select' ? label.substring(3).trim() : label;
  }

  edit(): void {
    this.editDTO = structuredClone(this.dto);
    this.editProvider = true;
    this.populateLocationOptions(this.editDTO.countryCode);
  }

  onCountryChange(): void {
    this.populateLocationOptions(this.editDTO.countryCode);
    this.editDTO.stateCode = StateCodeEnum.Select;
    this.editDTO.timeZoneCode = TimeZoneCodeEnum.Select;
  }

  private populateLocationOptions(countryCode: CountryCodeEnum): void {
    this.stateOptions = this.toolsService.getStateCodes(countryCode);
    this.timeZoneOptions = this.toolsService.getTimeZoneCodes(countryCode);
  }

  editSave(): void {
    this.loading = true;

    this.editDTO.countryCode = +this.editDTO.countryCode;
    this.editDTO.stateCode = +this.editDTO.stateCode;
    this.editDTO.timeZoneCode = +this.editDTO.timeZoneCode;

    this.providerService.updateProviderAsync(this.editDTO).subscribe(result => {
      this.loading = false;
      if (!result) return;

      if (!result.errorMessage?.trim()) {
        this.dto = structuredClone(this.editDTO);
        this.cancelEdit();
      } else {
        this.editDTO.errorMessage = result.errorMessage;
      }
    });
  }

  cancelEdit(): void {
    this.editDTO = new ProviderDTO();
    this.editProvider = false;
  }

  cancelSubscription(): void {
    this.showDeleteModal = true;
  }

  onCancelSubscription(confirm: boolean): void {
    if (confirm) {
      this.loading = true;
      this.providerService.cancelSubscriptionAsync().subscribe(result => {
        this.loading = false;
        if (result) this.getProvider();
      });
    }
    this.showDeleteModal = false;
  }

  reActivateSubscription(): void {
    this.showReSubscribeModal = true;
  }

  onReActivateSubscription(confirm: boolean): void {
    if (!confirm) {
      this.showReSubscribeModal = false;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.providerService.reActivateSubscriptionAsync().subscribe(result => {
      this.loading = false;
      if (!result) return;

      if (result.errorMessage?.trim()) {
        this.dto.errorMessage = result.errorMessage;
      } else {
        this.getProvider();
      }
    });

    this.showReSubscribeModal = false;
  }
}