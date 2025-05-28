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
} from '../models/Enums';
import { ToolsService } from '../_services/tools.service';
import { CurrentStateService } from '../_services/current-state.service';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';

@Component({
  selector: 'am-provider-profile',
  imports: [CommonModule, RouterLink, FormsModule, LoadingScreenComponent, DeleteEntityComponent],
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
  showDeleteModal: boolean = false;

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
    this.providerService.getProviderAsync(true).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.dto = result;
      this.disableCancel = false;
      this.loading = false;
    });
  }

  getEnumLabel(enumObj: any, enumValue: any): string {
    return enumObj[enumValue]?.replaceAll('_', ' ').replaceAll('US ', "") || '';
  }

  public getEditLabel(label: string): string {
    if (!label) return '';
    if (label === "Select") {
      return label;
    }
    return label.substring(3).trim();
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
        if (result === null) {
          this.loading = false;
          return;
        }
        if (!result.errorMessage || result.errorMessage.trim() === '') {
          this.dto = JSON.parse(JSON.stringify(this.editDTO));
          this.cancelEdit();
        } else {
          this.editDTO.errorMessage = result.errorMessage;
        }
        this.loading = false;
      });
  }

  cancelEdit() {
    this.editDTO = new ProviderDTO();
    this.editProvider = false;
  }

  cancelSubscription() {
    this.showDeleteModal = true;
  }

  oncCancelSubscription(confirm: boolean) {
    this.loading = true;
    if (confirm) {
      this.providerService.cancelSubscriptionAsync().subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.getProvider();
      })
    }
    this.loading = false;
    this.showDeleteModal = false;
  }
}
